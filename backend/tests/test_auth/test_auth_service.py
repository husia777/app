import pytest
from src.use_cases.session_use_case import AuthService
from passlib.hash import bcrypt


@pytest.fixture
async def auth_service() -> AuthService:
    return AuthService()


async def test_verify_password():
    password = "password123"
    hashed_password = bcrypt.hash(password.encode())
    data = await AuthService.verify_password("password123", "$2a$12$hwu/HIpL9a5DZ8pqkCUeWOHsPIbduyczgkLBuNxlisto1oq4AYVvq") == True
    assert data
