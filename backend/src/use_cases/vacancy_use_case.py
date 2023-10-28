from fastapi import Depends
from src.api.schemas.vacancy_schema import VacancyUpdateSchema
from src.entities.vacancy import Vacancy
from src.repositories.vacancy.vacancy_db_repository import  VacancyDbRepository


class VacancyService:
    def __init__(self, repository: VacancyDbRepository = Depends()) -> None:
        self.repository: VacancyDbRepository = repository

    async def get_vacancy(self, vacancy_id: int):
        return await self.repository.get_vacancy(vacancy_id)

    async def get_all(self):
        return await self.repository.get_all()

    async def save(self, vacancy: Vacancy) -> dict[str, str]:
        return await self.repository.save(vacancy)

    async def delete(self, vacancy_id: int) -> dict[str, str]:
        return await self.repository.delete(vacancy_id)

    async def edit(self, vacancy_id: int, vacancy: Vacancy):
        return await self.repository.edit(vacancy_id, vacancy)
