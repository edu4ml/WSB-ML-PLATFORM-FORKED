from django.test import Client
import pytest
from rest_framework import status
from django.urls import reverse

from elearning.auth.user import User


@pytest.fixture
@pytest.mark.django_db
def user():
    return User.objects.create_user(
        username="testuser", email="testuser@example.com", password="adminadmin"
    )


@pytest.fixture
@pytest.mark.django_db
def client(user):
    """
    Authenticated client fixture
    """
    client = Client(enforce_csrf_checks=False)
    response = client.post(
        reverse("auth:rest_login"), dict(username=user.username, password="adminadmin")
    )
    assert response.status_code == 200
    return client


@pytest.mark.django_db
def test_list_courses(client):
    response = client.get(reverse("course"))
    print(response)
    print(response.json())

    assert response.status_code == status.HTTP_200_OK
