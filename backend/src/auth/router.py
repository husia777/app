from fastapi import APIRouter, Depends, status, Response
from .schemas import Token, UserCreate, User, BaseUser, UserUpdate, UserLogin

from .service import AuthService, get_current_user
router = APIRouter(
    prefix='',
    tags=['core'],
)


@router.post('/register/', response_model=BaseUser, status_code=status.HTTP_201_CREATED)
async def sign_up(
        user_data: UserCreate,
        auth_service: AuthService = Depends(),
):
    return await auth_service.register_new_user(user_data)


@router.post('/login/')
async def sign_in(response: Response,
                  auth_data: UserLogin,
                  auth_service: AuthService = Depends()):
    data = await auth_service.authenticate_user(
        auth_data.username,
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


@router.get("/logout/")
async def logout():
    response = Response(status_code=status.HTTP_204_NO_CONTENT)
    response.delete_cookie(key='refreshToken')
    return response


@router.get("/refresh/", status_code=status.HTTP_200_OK)
async def get_new_access_token(token: str, auth_service: AuthService = Depends()):

    refresh_data = await auth_service.get_new_access_token(token)

    new_access_token = await auth_service.create_token(refresh_data.dict())
    return {
        "access_token": new_access_token,
        "token_type": "Bearer",
        "status": status.HTTP_200_OK
    }


@router.get('/profile/', response_model=User)
async def get_user(user: User = Depends(get_current_user)):
    return user


@router.put('/profile/', response_model=User)
async def update_user(user_data: UserUpdate, user: User = Depends(get_current_user),
                      auth_service: AuthService = Depends()):
    return await auth_service.change_user(user_data, user)
