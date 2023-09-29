
from datetime import datetime
import os
from sqlalchemy import JSON, TIMESTAMP, Integer, NullPool, String
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, mapped_column, relationship

from ..config import settings




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




