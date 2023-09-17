from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from .auth.router import router as auth_router
app = FastAPI(root_path="/api")


app.include_router(router=auth_router)
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://huseinnaimov.com",
    "https://huseinnaimov.com",
    "http://huseinnaimov.com/api/login/",
    "https://huseinnaimov.com/api/login",

]
middleware = [
    Middleware(CORSMiddleware,
               allow_origins=origins,
               allow_credentials=True,
               allow_methods=["*"],
               allow_headers=["*"],
               expose_headers=["*"])
]

app.middleware_stack.add_middleware(middleware)