from fastapi import Depends
from src.repositories.article.article_db_repository import ArticleDbRepository, AbstractArticleUseCases
from src.entities.article import Article


class ArticleService:
    def __init__(self, repository: ArticleDbRepository = Depends()) -> None:
        self.repository: ArticleDbRepository = repository

    async def get_article(self, article_id: int):
        return await self.repository.get(article_id)

    async def get_all(self):
        return await self.repository.get_all()

    async def save(self, article: Article):
        print(article)
        return await self.repository.save(article)

    async def delete(self, article_id: int):
        return await self.repository.delete(article_id)

    async def edit(self, article_id: int, article: Article):
        return await self.repository.edit(article_id, article)

    async def get_user_articles(self, user_id: int):
        return await self.repository.get_user_articles(user_id)