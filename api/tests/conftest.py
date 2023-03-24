from uuid import uuid4

import pytest
from django.test import Client
from django.urls import reverse
from model_bakery import baker

from db.models import (
    Course as CourseDbModel,
    CourseStep,
    Exercise,
    Evaluation,
    Role,
)
from elearning.auth.user import User
from shared.enums import UserRoles


@pytest.fixture
def admin():
    user = User.objects.create_user(
        uuid=uuid4(),
        username="testuser",
        email="testuser@example.com",
        password="adminadmin",
    )
    user.roles.add(Role.objects.create(name=UserRoles.ADMIN))
    return user


@pytest.fixture
def student():
    student = User.objects.create_user(
        uuid=uuid4(),
        username="teststudent",
        email="teststudent@example.com",
        password="adminadmin",
    )
    student.roles.add(Role.objects.create(name=UserRoles.STUDENT))
    return student


@pytest.fixture
def teacher():
    teacher = User.objects.create_user(
        uuid=uuid4(),
        username="testteacher",
        email="testteacher@example.com",
        password="adminadmin",
    )
    teacher.roles.add(Role.objects.create(name=UserRoles.TEACHER))
    return teacher


@pytest.fixture
def client():
    return Client(enforce_csrf_checks=False, HTTP_ACCEPT="application/json")


@pytest.fixture
def admin_client(admin, client):
    response = client.post(
        reverse("api:v1:auth:rest_login"), dict(username=admin.username, password="adminadmin")
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def student_client(student, client):
    response = client.post(
        reverse("api:v1:auth:rest_login"),
        dict(username=student.username, password="adminadmin"),
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def teacher_client(teacher, client):
    response = client.post(
        reverse("api:v1:auth:rest_login"),
        dict(username=teacher.username, password="adminadmin"),
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def courses():
    return baker.make(CourseDbModel, 4, is_draft=False)


@pytest.fixture
def course():
    return baker.make(CourseDbModel)


@pytest.fixture
def exercises():
    return baker.make(Exercise, 3)


@pytest.fixture
def exercise():
    return baker.make(Exercise)


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
    return baker.make(Evaluation)


@pytest.fixture
def file_evaluation_types():
    return baker.make(Evaluation, 5)
