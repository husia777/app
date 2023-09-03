from fastapi import FastAPI
from auth.router import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.include_router(router=auth_router)
origins = {
    "http://localhost",
    "http://localhost:3000",
    "http://huseinnaimov.com",
    "https://huseinnaimov.com"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
