from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth.router import router as auth_router
app = FastAPI(root_path="/api")


app.include_router(router=auth_router)
origins = {
    "http://localhost",
    "http://localhost:3000",
    "http://huseinnaimov.com",
    "https://huseinnaimov.com"
}

app.add_middleware(
    CORSMiddleware,
    # allow_origins=['http://huseinnaimov.com'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)
