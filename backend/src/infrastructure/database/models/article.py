from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.infrastructure.database.database import Base

from datetime import datetime
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.sql import func


class ArticleModel(Base):
    __tablename__ = "article"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(nullable=False)
    body: Mapped[str] = mapped_column(nullable=False)
    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    author: Mapped["User"] = relationship(back_populates="articles")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    likes: Mapped[int] = mapped_column(default=0)

 