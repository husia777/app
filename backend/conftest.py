import pytest


@pytest.fixture()
def rest_service():
    print('1')
    yield
    print('2')
