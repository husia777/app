from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth.router import router as auth_router
app = FastAPI()


app.include_router(router=auth_router)
origins = ["http://huseinnaimov.com"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://huseinnaimov.com"],
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
#     allow_headers=["Origin", "X-Requested-With", "Content-Type", "Accept"],


# )
