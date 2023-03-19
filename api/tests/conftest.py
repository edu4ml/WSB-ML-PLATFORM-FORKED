from uuid import uuid4
import pytest
from django.test import Client
from django.urls import reverse
from model_bakery import baker
from shared.enums import UserRoles
from db.models import (
    Course as CourseDbModel,
    CourseStep,
    Exercise,
    FileEvaluationType,
    Role,
)
from elearning.auth.user import User


@pytest.fixture
def admin_role():
    return Role.objects.create(name=UserRoles.ADMIN)


@pytest.fixture
@pytest.mark.django_db
def user(admin_role):
    user = User.objects.create_user(
        uuid=uuid4(),
        username="testuser",
        email="testuser@example.com",
        password="adminadmin",
    )

    user.roles.add(admin_role)
    return user


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
    return baker.make(CourseDbModel, 4)


@pytest.fixture
def course():
    return baker.make(CourseDbModel)


@pytest.fixture
def exercises():
    return baker.make(Exercise, 3)


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
                object=exercise,
                order=order,
                make_m2m=True,
            )
        )
        order += 1
    return course, steps


@pytest.fixture
def file_evaluation_type():
    return baker.make(FileEvaluationType)


@pytest.fixture
def file_evaluation_types():
    return baker.make(FileEvaluationType, 5)
