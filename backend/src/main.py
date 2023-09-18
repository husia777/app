from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth.router import router as auth_router
app = FastAPI()


app.include_router(router=auth_router)
origins = {
    "http://localhost",
    "http://localhost:3000",
    "http://huseinnaimov.com",
    "http://huseinnaimov.com/api",
    "http://huseinnaimov.com:8080/api",
    "http://huseinnaimov.com:8080",
    "https://huseinnaimov.com"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
