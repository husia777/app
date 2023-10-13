from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.auth.router import router as auth_router
from src.infrastructure.database.models.user import User
from src.infrastructure.database.database import engine
from starlette_admin.contrib.sqla import Admin, ModelView
from alembic import command
from alembic.config import Config

app = FastAPI()


admin = Admin(engine, title="Example: SQLAlchemy")
admin.add_view(ModelView(User))

admin.mount_to(app)

app.include_router(router=auth_router)
origins = [
    "http://localhost",
    "http://localhost:3000",
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



    
# def apply_migrations():
#     alembic_cfg = Config("alembic.ini")
#     command.revision(alembic_cfg, autogenerate=True, message="New migration")
#     command.upgrade(alembic_cfg, "head")

# @app.on_event("startup")
# async def startup_event():
#     apply_migrations()