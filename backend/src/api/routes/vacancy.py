from fastapi import APIRouter, Depends
from src.api.schemas.vacancy_schema import VacancyUpdateSchema, VacancyCreateSchema
from src.use_cases.vacancy_use_case import VacancyService

router = APIRouter()


@router.get('/vacancies')
async def get_all(vacancy_service: VacancyService = Depends()):
    return await vacancy_service.get_all()


@router.get('/vacancy/{vacancy_id}')
# -> Any:# -> Any:# -> Any:
async def get_vacancy(vacancy_id: int, vacancy_service: VacancyService = Depends()):
    return await vacancy_service.get_vacancy(vacancy_id)


@router.post('/vacancy/create')
async def create_vacancy(vacancy: VacancyCreateSchema, vacancy_service: VacancyService = Depends()) -> dict[str, str]:
    return await vacancy_service.save(vacancy)


@router.delete('/vacancy/{vacancy_id}/delete')
async def delete_vacancy(vacancy_id: int, vacancy_service: VacancyService = Depends()) -> dict[str, str]:
    return await vacancy_service.delete(vacancy_id)


@router.patch("/vacancy/{vacancy_id}/edit")
async def edit_vacancy(vacancy: VacancyUpdateSchema, vacancy_id: int, vacancy_service: VacancyService = Depends()):
    print(vacancy_id)
    print(vacancy)
    return await vacancy_service.edit(vacancy_id, vacancy)
