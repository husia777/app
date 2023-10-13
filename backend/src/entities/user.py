import dataclasses
from datetime import datetime


@dataclasses.dataclass
class User:

    id: int | None = None
    email: str
    username: str
    registered_at: datetime
    hashed_password: str
    name: str
    surname: str
    is_active: bool
    is_superuser: bool
    is_verified: bool

    @classmethod
    def from_dict(self, data):
        return self(**data)

    def to_dict(self):
        return dataclasses.asdict(self)
