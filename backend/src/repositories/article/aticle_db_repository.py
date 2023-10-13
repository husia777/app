from fastapi import Depends
from sqlalchemy import  select
from sqlalchemy.orm import Session

from src.entities.article import Article
from src.infrastructure.database.database import AsyncSessionLocal, get_session
from src.infrastructure.database.models.article import ArticleModel


class ArticleDbRepository:
    def __init__(self,
                 session: Session = Depends(get_session)) -> None:
        self.session: Session = session
        
    async def save(self, article: Article):
        self.session.add(ArticleModel(author=article.author,
                                      title=article.title,
                                      body=article.body))
        await self.session.commit()

    async def get(self, article):
        pass

    async def get_all(self) -> list[Article]:
        data = self.session.execute(select(ArticleModel)).scalars().all()
        return data