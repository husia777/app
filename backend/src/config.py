from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    postgres_user: str
    postgres_db: str
    postgres_password: str
    sqlalchemy_database_url: str

    class Config:
        case_sensitive = False
        env_file = '.env.backend'


settings = Settings(_env_file='.env.backend', _env_file_encoding='utf-8')
