from datetime import datetime
from enum import Enum
from pydantic import BaseModel
from src.infrastructure.database.models.vacancy import FormatOfWorkEnum

from src.api.schemas.session_schema import User


class VacancyCreateSchema(BaseModel):
    title: str
    description: str
    body: str
    salary_from: int
    salary_to:  int
    form_of_work: FormatOfWorkEnum
    author_id: int


class VacancyUpdateSchema(BaseModel):
    title: str | None = None
    description: str | None = None
    body: str | None = None
    salary_from: int | None = None
    salary_to:  int | None = None
    form_of_work: FormatOfWorkEnum
