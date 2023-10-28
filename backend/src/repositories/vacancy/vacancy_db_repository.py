from abc import ABC, abstractmethod
from fastapi import Depends
from sqlalchemy import delete, select, update
from sqlalchemy.orm import Session
from src.infrastructure.database.database import get_session
from src.infrastructure.database.models.vacancy import VacancyDbModel

from src.entities.vacancy import Vacancy


class VacancyDbRepository:

    def __init__(self, session: Session = Depends(get_session)) -> None:
        self.session: Session = session

    async def save(self, vacancy: Vacancy):
        self.session.add(VacancyDbModel(
            author_id=vacancy.author_id,
            title=vacancy.title,
            body=vacancy.body,
            form_of_work=vacancy.form_of_work,
            description=vacancy.description,
            salary_from=vacancy.salary_from,
            salary_to=vacancy.salary_to))
        await self.session.commit()
        return {"status": "ok"}

    async def get_vacancy(self, vacancy_id: int):
        vacancy = await self.session.execute(select(VacancyDbModel).where(VacancyDbModel.id == vacancy_id))
        return vacancy.scalar()

    async def get_all(self):
        vacancies = await self.session.execute(select(VacancyDbModel))
        return vacancies.scalars().all()

    async def delete(self, vacancy_id: int):
        await self.session.execute(delete(VacancyDbModel).where(VacancyDbModel.id == vacancy_id))
        return {"status": "ok"}

    async def edit(self, vacancy_id: int, vacancy: Vacancy):

        stmt = update(VacancyDbModel).where(VacancyDbModel.id ==
                                            vacancy_id).values(title=vacancy.title, body=vacancy.body, description=vacancy.description,
                                                               form_of_work=vacancy.form_of_work, salary_from=vacancy.salary_from, salary_to=vacancy.salary_to).returning(VacancyDbModel)
        result = await self.session.execute(stmt)
        await self.session.commit()
        return result.scalar()
