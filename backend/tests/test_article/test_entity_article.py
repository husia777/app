from src.entities.article import Article
from datetime import datetime


class TestArticleEntities:

    def test_create_entity(self):
        created_at = datetime.now()
        expected_value = {
            "id": 1,
            'title': '1',
            'body': '1',
            'author': '1',
            'created_at': created_at,
        }
        article = Article(id=1, author='1', body='1', title='1',
                          created_at=created_at)

        assert article.to_dict() == expected_value

    def test_entity_article_convert_from_dict(self):
        created_at = datetime.now()
        article = Article(id=1, author='1', body='1', title='1',
                          created_at=created_at)
        dict_article: Article = article.to_dict()
        assert Article.from_dict(dict_article) == article
