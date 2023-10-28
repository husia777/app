from dataclasses import dataclass
from fastapi import Depends
from sqlalchemy import select, delete, update
from sqlalchemy.orm import Session

from src.entities.article import Article
from src.infrastructure.database.database import AsyncSessionLocal, get_session
from src.infrastructure.database.models.article import ArticleDBModel
from abc import ABC, abstractmethod


class AbstractArticleUseCases(ABC):

    @abstractmethod
    def save(self, article):
        pass

    @abstractmethod
    def get(self, article_id):
        pass

    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def delete(self, article):
        pass

    @abstractmethod
    def edit(self, article_id, article):
        pass


class ArticleDbRepository(AbstractArticleUseCases):
    def __init__(self,
                 session: Session = Depends(get_session)) -> None:
        self.session: Session = session

    async def save(self, article: Article):
        self.session.add(ArticleDBModel(author_id=article.author_id,
                                        title=article.title,
                                        body=article.body))
        await self.session.commit()

    async def get(self, article_id: int):
        article = await self.session.execute(
            select(ArticleDBModel).where(ArticleDBModel.id == article_id))

        return article.scalar()

    async def get_all(self):
        query = select(ArticleDBModel)
        result = await self.session.execute(query)
        all_articles = result.fetchall()
        columns = result.keys()

        return all_articles, columns

    async def get_user_articles(self, user_id: int):
        article = await self.session.execute(
            select(ArticleDBModel).where(ArticleDBModel.author_id == user_id))

        return article.scalars().all()

    async def delete(self, article_id: int):
        stmt = delete(ArticleDBModel).where(ArticleDBModel.id == article_id)
        await self.session.execute(stmt)
        await self.session.commit()

        return {"status": "ok"}

    async def edit(self, article_id: int, article: Article):
        stmt = update(ArticleDBModel).where(ArticleDBModel.id == article_id).values(
            title=article.title, body=article.body).returning(ArticleDBModel)
        result = await self.session.execute(stmt)
        await self.session.commit()  # примените изменения в базе данных
        return result.scalar_one()
