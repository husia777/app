from datetime import datetime, timedelta
from ..config import settings
from ..database.database import get_session
# from database.database import get_session
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException, status, Response, Header
from ..auth import schemas, models
from passlib.hash import bcrypt
from jose import jwt, JWTError
from pydantic import ValidationError
from typing import Annotated


async def get_api_key_header(authorization: Annotated[str | None, Header(...)]) -> str:
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    return token


async def get_current_user(token: str = Depends(get_api_key_header), session: AsyncSession = Depends(get_session)) -> schemas.User:
    token_data = AuthService.verify_token(token)
    user = await session.execute(select(models.User).where(models.User.id == int(token_data)))
    user = user.scalar()
    return user


class AuthService:
    def __init__(self, session: AsyncSession = Depends(get_session)) -> None:
        self.session = session

    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, password) -> str:
        return bcrypt.hash(password)

    @classmethod
    def create_refresh_token(cls, user: models.User):
        user_data = schemas.User.model_validate(user)
        now = datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + timedelta(seconds=settings.jwt_expires_s),
            'sub': user_data.id,
        }

        encoded_jwt = jwt.encode(
            payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

        return encoded_jwt

    @classmethod
    def create_token(cls, user: models.User):
        # превращаем модель орм в модель pydantic
        user_data = schemas.User.model_validate(user)
        now = datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + timedelta(seconds=settings.jwt_expires_s),
            'sub': str(user_data.id),
        }
        token = jwt.encode(
            payload,
            settings.jwt_secret,
            algorithm=settings.jwt_algorithm)
        return token

    @classmethod
    def get_new_access_token(cls, token: str):
        token_data = cls.verify_token(token)
        return cls.create_token(token_data)

    @classmethod
    def verify_token(cls, token):

        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={'WWW-Authenticate': 'Bearer'},
            detail='Не удалось подтвердить учетные данные')

        try:  	# Достаем данные из токена
            payload = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=[settings.jwt_algorithm])
        except JWTError:
            raise exception from None
        user_data = payload.get('sub')

        return user_data

    async def register_new_user(self, user_data: schemas.UserCreate,) -> schemas.BaseUser:
        def exception(detail):
            return HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=detail,
                headers={'WWW-Authenticate': 'Bearer'})
        check_username = await self.session.execute(select(models.User).where(models.User.username == user_data.username))
        check_email = await self.session.execute(select(models.User).where(models.User.email == user_data.email))
        if user_data.password != user_data.password_repeat:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Пароли не совпадают',
                headers={'WWW-Authenticate': 'Bearer'})
        if check_username.scalar():
            raise exception('Пользователь с таким логином  уже существует')
        if check_email.scalar():
            raise exception('Пользователь с таким email  уже существует')

        user = models.User(
            email=user_data.email,
            username=user_data.username,
            hashed_password=self.hash_password(user_data.password))
        self.session.add(user)
        await self.session.commit()
        return schemas.BaseUser(username=user.username, email=user.email)

    async def authenticate_user(self, username: str, password: str) -> dict:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Неверно введен логин или пароль.',
            headers={'WWW-Authenticate': 'Bearer'})
        user = await self.session.execute(select(models.User).where(models.User.username == username))
        user = user.scalar()

        if not user:
            raise exception
        if not self.verify_password(password, user.hashed_password):
            raise exception

        access_token = self.create_token(user)
        refresh_token = self.create_refresh_token(user)
        refresh_token_check = await self.session.execute(
            select(models.RefreshToken).where(models.RefreshToken.user_id == user.id))

        if refresh_token_check.first():
            await self.session.execute(delete(models.RefreshToken).where(models.RefreshToken.user_id == user.id))
            await self.session.commit()

        refresh_token_dict = {
            "user_id": user.id,
            "refresh_token": str(refresh_token),
        }

        refresh_token_db_data = models.RefreshToken(**refresh_token_dict)
        self.session.add(refresh_token_db_data)
        await self.session.commit()
        return {
            "accessToken": access_token,
            "token_type": "bearer",
            "refreshToken": refresh_token,
            "message": "Авторизация прошла успешно",
            "status": status.HTTP_200_OK
        }

    async def change_user(self, data_user: schemas.UserUpdate, user: schemas.User) -> schemas.BaseUser:
        user = await self.session.execute(select(models.User).where(models.User.username == user.username))
        user = user.scalar()
        user.email = data_user.email
        user.username = data_user.username
        user.hashed_password = self.hash_password(data_user.password)
        user.name = data_user.name
        user.surname = data_user.surname
        self.session.add(user)
        await self.session.commit()
        return schemas.BaseUser(username=user.username, email=user.email)
