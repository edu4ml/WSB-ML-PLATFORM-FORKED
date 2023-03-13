from django.test import Client
import pytest
from django.urls import reverse

from elearning.auth.user import User
from model_bakery import baker
from db.models.course import Course as CourseDbModel


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
    client = Client(enforce_csrf_checks=False, HTTP_ACCEPT="application/json")
    response = client.post(
        reverse("auth:rest_login"), dict(username=user.username, password="adminadmin")
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def courses():
    return baker.make(CourseDbModel, 10)
