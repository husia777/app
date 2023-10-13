import dataclasses
from datetime import datetime


@dataclasses.dataclass
class Article:
    id:  int | None = None
    title: str
    body: str
    author: str
    created_at: datetime

    @classmethod
    def from_dict(self, data):
        return self(**data)

    def to_dict(self):
        return dataclasses.asdict(self)
