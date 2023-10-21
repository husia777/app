from fastapi import Depends
from src.infrastructure.database.database import AsyncSessionLocal, get_session
from sqlalchemy.orm import Session
from sqlalchemy import delete, select
from src.infrastructure.database.models.user import UserDbModel, RefreshTokenDbModel


class SessionDbRepository:
    def __init__(self, session: AsyncSessionLocal = Depends(get_session)) -> None:
        self.session: Session = session

    async def check_username(self, username: str) -> bool:
        check_username = await self.session.execute(select(UserDbModel).where(UserDbModel.username == username))
        if check_username.scalar():
            return True
        return False

    async def check_email(self, email: str) -> bool:
        check_email = await self.session.execute(select(UserDbModel).where(UserDbModel.email == email))
        if check_email.scalar():
            return True
        return False

    async def activate_user(self, user_id: int) -> bool:

        try:
            user = await self.session.execute(select(UserDbModel).where(UserDbModel.id == user_id))
            user = user.scalar()
            user.is_verified = True
            self.session.add(user)
            await self.session.commit()
            return True
        except:
            return False

    async def get_current_user(self, user_id):
        user = await self.session.execute(select(UserDbModel).where(UserDbModel.id == user_id))
        user = user.scalar()
        return user

    async def register_user(self, email, username, hashed_password) -> tuple[str, str]:

        user = UserDbModel(
            email=email,
            username=username,
            hashed_password=hashed_password)
        self.session.add(user)
        await self.session.commit()
        return (user.username, user.email)

    async def authenticate_user(self, email):
        user = await self.session.execute(select(UserDbModel).where(UserDbModel.email == email))
        user = user.scalar()
        return user

    async def refresh_token_check(self, user_id):
        refresh_token = await self.session.execute(
            select(RefreshTokenDbModel).where(RefreshTokenDbModel.user_id == user_id))
        return refresh_token.first()

    async def delete_refresh_token(self, user_id):
        await self.session.execute(delete(RefreshTokenDbModel).where(RefreshTokenDbModel.user_id == user_id))
        await self.session.commit()

    async def save_refresh_token(self, refresh_token_dict):
        refresh_token_db_data = RefreshTokenDbModel(**refresh_token_dict)
        self.session.add(refresh_token_db_data)
        await self.session.commit()
