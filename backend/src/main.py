from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.infrastructure.database.models.vacancy import VacancyDbModel
from src.api.routes.session import router as session_router
from src.api.routes.article import router as article_router
from src.api.routes.vacancy import router as vacancy_router
from src.infrastructure.database.models.user import UserDbModel
from src.infrastructure.database.models.article import ArticleDBModel
from src.infrastructure.database.database import engine
from starlette_admin.contrib.sqla import Admin, ModelView

app = FastAPI()


admin = Admin(engine, title="Example: SQLAlchemy")
admin.add_view(ModelView(UserDbModel))
admin.add_view(ModelView(ArticleDBModel))
admin.add_view(ModelView(VacancyDbModel))

admin.mount_to(app)

app.include_router(router=session_router)
app.include_router(router=article_router)
app.include_router(router=vacancy_router)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3030",
    "http://huseinnaimov.com",
    "http://huseinnaimov.com/api",
    "http://huseinnaimov.com:8080/api",
    "http://huseinnaimov.com:8080",
    "https://huseinnaimov.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
