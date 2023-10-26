import random
from passlib.hash import bcrypt
from fastapi.encoders import jsonable_encoder
from src.repositories.session.session_db_repository import SessionDbRepository
from src.infrastructure.config import settings
from datetime import datetime, timedelta
from typing import Annotated
from fastapi import Depends, HTTPException, status, Header
from jose import jwt, JWTError
from aiosmtplib import SMTP
from email.message import EmailMessage
import json

from src.api.schemas.session_schema import ConfirmUser, RefreshToken, User, BaseUser, UserCreate, ActivateUser, UserUpdate
from src.infrastructure.database.models.user import UserDbModel, RefreshTokenDbModel


class AuthService:
    def __init__(self, repository: SessionDbRepository = Depends()) -> None:
        self.repository: SessionDbRepository = repository

    @classmethod
    async def create_token(cls, user: UserDbModel):
        # превращаем модель орм в модель pydantic
        user_data = jsonable_encoder(user.__dict__)
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
    async def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

    @classmethod
    async def hash_password(cls, password) -> str:
        return bcrypt.hash(password)

    @classmethod
    async def generate_confirmation_code(cls) -> int:
        random_number = random.randint(1000, 9999)
        return random_number

    @classmethod
    def exception(self, detail) -> HTTPException:
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={'WWW-Authenticate': 'Bearer'})

    async def get_api_key_header(self, authorization: Annotated[str | None, Header(...)]) -> str:

        if not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=401, detail="Invalid authorization header")
        token: str = authorization.split(" ")[1]
        return str(token)

    async def activate_user(self, id: int) -> bool:
        return await self.repository.activate_user(id)

    async def get_current_user(self, token: str = Depends(get_api_key_header)) -> User:
        token_data = self.verify_token(token)
        token_data = json.loads(token_data)
        user_id = token_data.get("id")
        user = await self.repository.get_current_user(user_id=user_id)
        return user

    async def register_new_user(self, user_data: UserCreate) -> BaseUser:
        check_username = await self.repository.check_username(user_data.username)
        check_email = await self.repository.check_email(user_data.email)
        if user_data.password != user_data.password_repeat:
            raise self.exception('Пароли не совпадают')

        if check_username:
            raise self.exception(
                'Пользователь с таким логином  уже существует')
        if check_email:
            raise self.exception('Пользователь с таким email  уже существует')
        hashed_password = await self.hash_password(user_data.password)

        username, email = await self.repository.register_user(
            username=user_data.username, email=user_data.email, hashed_password=hashed_password)
        return BaseUser(username=username, email=email)

    async def authenticate_user(self, email: str, password: str) -> dict:

        user: UserDbModel = await self.repository.authenticate_user(email)

        if not user:
            raise self.exception('Неверно введен логин или пароль.')
        if not await self.verify_password(password, user.hashed_password):
            raise self.exception("Пароль неверный")

        access_token = await self.create_token(user)
        refresh_token = await self.create_token(user)
        is_refresh_token = await self.repository.refresh_token_check(user.id)

        if is_refresh_token:
            await self.repository.delete_refresh_token(user_id=user.id)

        refresh_token_dict = {
            "user_id": user.id,
            "refresh_token": str(refresh_token),
        }

        await self.repository.save_refresh_token(refresh_token_dict)
        return {
            "accessToken": access_token,
            "token_type": "bearer",
            "refreshToken": refresh_token,
            "message": "Авторизация прошла успешно",
            "status": status.HTTP_200_OK
        }

    # async def change_user(self, data_user: UserUpdate, user: User) -> BaseUser:
    #     user = await self.session.execute(select(User).where(User.username == user.username))
    #     user = user.scalar()
    #     user.email = data_user.email
    #     user.username = data_user.username
    #     user.hashed_password = self.hash_password(data_user.password)
    #     user.name = data_user.name
    #     user.surname = data_user.surname
    #     self.session.add(user)
    #     await self.session.commit()
    #     return schemas.BaseUser(username=user.username, email=user.email)

    async def get_new_access_token(self, token: RefreshToken):

        token_data = self.verify_token(token.token)
        token_data = json.loads(token_data)
        user_id = token_data.get("id")
        user = await self.repository.get_current_user(user_id=user_id)

        return await self.create_token(user)

    def verify_token(self, token):

        try:  	# Достаем данные из токена
            payload = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=[settings.jwt_algorithm])
        except JWTError:
            raise self.exception(
                'Не удалось подтвердить учетные данные') from None
        user_data = str(payload.get('sub'))
        return user_data

    async def send_confirmation_email(self, email: ConfirmUser) -> int:
        code = await self.generate_confirmation_code()
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
