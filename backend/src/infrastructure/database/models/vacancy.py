from datetime import datetime
import enum
from src.infrastructure.database.database import Base
from sqlalchemy import DateTime, ForeignKey, func, Enum
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy.orm import relationship


class FormatOfWorkEnum(str, enum.Enum):
    remote = "remote"
    in_the_office = "in_the_office"
    hybrid = "hybrid"


class VacancyDbModel(Base):
    __tablename__ = 'vacancy'
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    salary_from: Mapped[int] = mapped_column(nullable=False)
    salary_to:  Mapped[int] = mapped_column()
    form_of_work: Mapped[Enum] = mapped_column(
        Enum(FormatOfWorkEnum), nullable=False)
    body: Mapped[str] = mapped_column(nullable=False)
    author: Mapped["UserDbModel"] = relationship(back_populates="vacancies")
    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now())
    # skills: Mapped[list["SkillsDbModel"]] = relationship()
