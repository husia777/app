from fastapi import APIRouter, Depends
from src.use_cases.article_use_case import ArticleService
from src.entities.article import Article
from src.api.schemas.article_schema import ArticleUpdateSchema, ArticleCreateSchema

router = APIRouter()


@router.get('/article/{article_id}')
async def get_article(article_id: int, article_service: ArticleService = Depends()):
    return await article_service.get_article(article_id)


@router.get('/articles')
async def get_all_articles(article_service: ArticleService = Depends()):
    all_articles, columns = await article_service.get_all()
    dict_all_articles = [dict(zip(columns, article))
                         for article in all_articles]
    return dict_all_articles


@router.post("/article/create")
async def create_article(article: ArticleCreateSchema, article_service: ArticleService = Depends()):
    return await article_service.save(article)


@router.delete("/article/{article_id}/delete")
async def delete_article(article_id: int, article_service: ArticleService = Depends()):
    return await article_service.delete(article_id)


@router.patch("/article/{article_id}/edit")
async def edit_article(article_id: int, article: ArticleUpdateSchema, article_service: ArticleService = Depends()):
    return await article_service.edit(article_id, article)
