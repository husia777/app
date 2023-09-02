
from datetime import datetime
import os
from sqlalchemy import JSON, TIMESTAMP, Integer, NullPool, String
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, mapped_column, relationship

from src.config import settings


engine = create_async_engine(
    settings.sqlalchemy_database_url, echo=True, future=True, poolclass=NullPool,
)
AsyncSessionLocal = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False)

# Базовая настройка


class Base(DeclarativeBase):
    pass


async def get_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


class User(Base):
    __tablename__ = 'users'
    id = mapped_column(Integer, primary_key=True, index=True)
    email = mapped_column(String, unique=True, nullable=False)
    username = mapped_column(String, nullable=False)
    password = mapped_column(String, nullable=False)
    registered = mapped_column(TIMESTAMP, default=datetime.utcnow)
    role = relationship("Roles", back_populates="owner")


class Roles(Base):
    __tablename__ = 'roles'
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, nullable=False)
    permissions = mapped_column(JSON)
    owner = relationship("User", back_populates="role")
