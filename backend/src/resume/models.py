from database.database import Base
from sqlalchemy import Mapped, mapped_column
class Resume(Base):
    name:Mapped[str] = mapped_column()