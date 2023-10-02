from ..config import settings
from ..database.database import get_session
from ..auth import schemas, models
from datetime import datetime, timedelta
from typing import Annotated
import random
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException, status, Response, Header
from fastapi.encoders import jsonable_encoder
from passlib.hash import bcrypt
from jose import jwt, JWTError
from pydantic import ValidationError
from aiosmtplib import SMTP
from email.message import EmailMessage
from email.mime.text import MIMEText
import json


async def generate_confirmation_code() -> int:
    random_number = random.randint(1000, 9999)
    return random_number


async def get_api_key_header(authorization: Annotated[str | None, Header(...)]) -> str:
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    return str(token)


async def get_current_user(token: str = Depends(get_api_key_header), session: AsyncSession = Depends(get_session)) -> schemas.User:
    token_data = AuthService.verify_token(token)
    print(token_data)
    token_data = token_data.split(" ")[0]
    print(token_data)

    token_data = dict(token_data)
    print(token_data)

    user_id = token_data.get("id")
    # user_id = int(token_data.split(" ")[1].split('=')[1])
    user = await session.execute(select(models.User).where(models.User.id == user_id))
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
    def create_token(cls, user: models.User):
        # превращаем модель орм в модель pydantic
        user_data = jsonable_encoder(user.__dict__)
        print(user_data)
        now = datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + timedelta(seconds=settings.jwt_expires_s),
            'sub': json.dumps(user_data)  # Преобразуем словарь в строку JSON
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
        user_data = str(payload.get('sub'))
        return user_data

    @classmethod
    async def send_confirmation_email(self, email: schemas.ConfirmUser) -> int:
        code = await generate_confirmation_code()
        message = EmailMessage()
        message["Subject"] = "Подтверждение регистрации"
        message["From"] = settings.mail_username
        message["To"] = email.email

        html = """
                <html>
                <head>
                <style>
                    h1 {{
                        color: blue;
                        font-size: 24px;
                    }}
                    
                    p {{
                        color: green;
                        font-size: 16px;
                    }}
                </style>
                </head>
                <body>
                <h1>Привет, ваш код подтверждения аккаунта!</h1>
                <h1>{code}</h1>
                <p>This is a test email with <b>styled HTML</b> content.</p>
                </body>
                </html>
            """
        html = html.format(code=code)
        message.set_content(html, subtype="html")

        async with SMTP(hostname=settings.mail_host, port=settings.mail_port) as smtp:
            await smtp.login(settings.mail_username, settings.mail_password)
            await smtp.sendmail(settings.mail_username, email.email, message.as_string())
        return code

    async def register_new_user(self, user_data: schemas.UserCreate) -> schemas.BaseUser:
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

    async def authenticate_user(self, email: str, password: str) -> dict:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Неверно введен логин или пароль.',
            headers={'WWW-Authenticate': 'Bearer'})
        user = await self.session.execute(select(models.User).where(models.User.email == email))
        user = user.scalar()

        if not user:
            raise exception
        if not self.verify_password(password, user.hashed_password):
            raise exception

        access_token = self.create_token(user)
        refresh_token = self.create_token(user)
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

    async def activate_user(self, id: schemas.ActivateUser) -> bool:
        # try:

        user = await self.session.execute(select(models.User).where(models.User.id == id.id))
        user = user.scalar()
        user.is_active = True
        self.session.add(user)
        await self.session.commit()
        return True
        # except:
        # return False

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
