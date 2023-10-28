import dataclasses
from datetime import datetime
from enum import Enum

from src.api.schemas.session_schema import User


@dataclasses.dataclass
class Vacancy:
    title: str
    body: str
    description: str
    salary_from: int
    salary_to:  int
    form_of_work: Enum
    author_id: int
    created_at: datetime

    # skills: Mapped[list["SkillsDbModel"]] = relationship()

    @classmethod
    def from_dict(self, data):
        return self(**data)

    @classmethod
    def to_dict(self):
        return dataclasses.asdict(self)
