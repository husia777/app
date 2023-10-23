from pydantic import BaseModel


class ArticleCreateSchema(BaseModel):
    title: str
    body: str
    author_id: int


class ArticleUpdateSchema(BaseModel):
    title: str
    body: str
