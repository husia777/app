
from datetime import datetime
from sqlalchemy import JSON, TIMESTAMP, Integer, String
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, mapped_column
from config import SQLALCHEMY_DATABASE_URL


engine = create_async_engine(str(SQLALCHEMY_DATABASE_URL), echo=True)
AsyncSessionLocal = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False)

# Базовая настройка


class Base(DeclarativeBase):
    pass


async def get_session():
    session = AsyncSession()
    try:
        yield session
    finally:
        await session.close()


class User(Base):
    __tablename__ = 'users'
    id = mapped_column(Integer, primary_key=True, index=True)
    email = mapped_column(String, unique=True, nullable=False)
    username = mapped_column(String, nullable=False)
    password = mapped_column(String, nullable=False)
    registered = mapped_column(TIMESTAMP, default=datetime.utcnow)
    role_id = mapped_column("Roles", back_populates="owner")


class Roles(Base):
    __tablename__ = 'roles'
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, nullable=False)
    permissions = mapped_column(JSON)
