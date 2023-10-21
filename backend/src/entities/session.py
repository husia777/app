import dataclasses
from datetime import datetime
from passlib.hash import bcrypt
from datetime import datetime
import random


# @dataclasses.dataclass
# class SessionEntity:

#     id: int | None = None
#     email: str
#     username: str
#     registered_at: datetime
#     hashed_password: str
#     name: str
#     surname: str
#     is_active: bool
#     is_superuser: bool
#     is_verified: bool

#     @classmethod
#     async def from_dict(self, data):
#         return self(**data)

#     @classmethod
#     async def to_dict(self):
#         return dataclasses.asdict(self)
