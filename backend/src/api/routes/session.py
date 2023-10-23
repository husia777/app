from fastapi import APIRouter, Depends, status, Response
from src.api.schemas.session_schema import (UserCreate, User, BaseUser, UserUpdate,
                                            UserLogin, ConfirmUser, ActivateUser, RefreshToken)

from src.use_cases.session_use_case import AuthService
router = APIRouter()


@router.post('/register/', response_model=BaseUser, status_code=status.HTTP_201_CREATED)
async def sign_up(user_data: UserCreate, auth_service: AuthService = Depends()):
    return await auth_service.register_new_user(user_data)


@router.post('/login/')
async def sign_in(response: Response,
                  auth_data: UserLogin,
                  auth_service: AuthService = Depends()):
    data = await auth_service.authenticate_user(
        auth_data.email,
        auth_data.password)
    refresh_token = data.get('refreshToken')
    access_token = data.get('accessToken')
    response.set_cookie(
        key='refreshToken',
        value=refresh_token, httponly=True,
        secure=True,
        max_age=30 * 24 * 60 * 60,
    )
    response.headers["Authorization"] = f'Bearer {access_token}'
    return data


@router.post("/confirm")
async def confirm_account(email: ConfirmUser, auth_service: AuthService = Depends()):
    return await auth_service.send_confirmation_email(email)


@router.post("/activate")
async def activate_account(id: ActivateUser, auth_service: AuthService = Depends()):
    return await auth_service.activate_user(id.id)


@router.post("/refresh/", status_code=status.HTTP_200_OK)
async def get_new_access_token(token: RefreshToken, auth_service: AuthService = Depends()):
    return await auth_service.get_new_access_token(token)


@router.get('/profile/', response_model=User)
async def get_user(auth_service: AuthService = Depends()):
    user = await auth_service.get_current_user()
    return user
