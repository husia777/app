from datetime import datetime
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy.sql import func
from src.infrastructure.database.models.vacancy import VacancyDbModel
from src.infrastructure.database.database import Base
from src.infrastructure.database.models.article import ArticleDBModel


class UserDbModel(Base):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(
        primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    username: Mapped[str] = mapped_column(nullable=False)
    registered_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(nullable=True, default='')
    surname: Mapped[str] = mapped_column(nullable=True, default='')
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(default=False, nullable=False)
    is_verified: Mapped[bool] = mapped_column(default=False, nullable=False)
    articles: Mapped[list["ArticleDBModel"]
                     ] = relationship(back_populates="author")
    vacancies: Mapped[list[VacancyDbModel]
                      ] = relationship(back_populates="author")


class RefreshTokenDbModel(Base):
    __tablename__ = "refresh_token"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE", name="fk_refresh_token_user_id"), unique=True)
    refresh_token: Mapped[str] = mapped_column(nullable=False)
    date_created: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    user = relationship("UserDbModel")
