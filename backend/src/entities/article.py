import dataclasses
from datetime import datetime


@dataclasses.dataclass
class Article:
    title: str
    body: str
    author_id: int

    @classmethod
    def from_dict(self, data):
        return self(**data)

    @classmethod
    def to_dict(self):
        return dataclasses.asdict(self)
