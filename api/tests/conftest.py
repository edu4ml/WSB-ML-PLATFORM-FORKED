from django.test import Client
import pytest
from django.urls import reverse

from elearning.auth.user import User
from model_bakery import baker
from db.models import Exercise, Course as CourseDbModel, CourseStep


@pytest.fixture
@pytest.mark.django_db
def user():
    return User.objects.create_user(
        id=1, username="testuser", email="testuser@example.com", password="adminadmin"
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


@pytest.fixture
def course():
    return baker.make(CourseDbModel)


@pytest.fixture
def exercises():
    return baker.make(Exercise, 10)


@pytest.fixture
def course_with_steps(exercises):
    course = baker.make(CourseDbModel)
    steps = []
    order = 1
    for exercise in exercises:
        steps.append(
            baker.make(
                CourseStep,
                course=course,
                step_object=exercise,
                order=order,
                make_m2m=True,
            )
        )
        order += 1
    return course, steps
