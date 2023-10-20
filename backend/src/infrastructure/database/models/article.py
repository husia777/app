from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.infrastructure.database.database import Base

from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Table, column
from sqlalchemy.sql import func


class ArticleDBModel(Base):
    __tablename__ = "article"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(nullable=False)
    body: Mapped[str] = mapped_column(nullable=False)
    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    author: Mapped["UserDbModel"] = relationship(back_populates="articles")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    likes: Mapped[int] = mapped_column(default=0)


FilmsDetail = Table("FilmsDetail",
                    Base.metadata,
                    Column('genre', ForeignKey("genre.id"), primary_key=True),
                    Column('actor', ForeignKey("actor.id"), primary_key=True)
                    )


class Actor(Base):
    __tablename__ = "actor"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False)
    surname: Mapped[str] = mapped_column(nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    films: Mapped[list[Fil]]


class Genre(Base):
    __tablename__ = "genre"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False)


class Films(Base):
    __tablename__ = "films"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False)
    genre: Mapped[Genre] = relationship(secondary=FilmsDetail)
    actors = Mapped[list[Actor]] = relationship(secondary=FilmsDetail)
