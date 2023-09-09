from pydantic import BaseModel, Field, ConfigDict


class BaseUser(BaseModel):
    username: str
    model_config = ConfigDict(from_attributes=True)


class TokenData(BaseModel):
    username: int


class UserUpdate(BaseUser):
    password: str
    name: str


class UserCreate(BaseUser):
    email: str
    password: str
    password_repeat: str


class User(BaseUser):
    id: int = Field(primary_key=True)
    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class UserLogin(BaseUser):
    password: str
