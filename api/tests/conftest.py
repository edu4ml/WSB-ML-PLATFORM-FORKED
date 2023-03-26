from uuid import uuid4

import pytest
from django.test import Client
from django.urls import reverse
from model_bakery import baker

from db.models import Course, CourseStep, Role, CourseComponent
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
        reverse("api:v1:auth:rest_login"),
        dict(username=admin.username, password="adminadmin"),
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
    return baker.make(Course, 4, is_draft=False)


@pytest.fixture
def published_course():
    return baker.make(Course, is_draft=False)


@pytest.fixture
def draft_course():
    return baker.make(Course, is_draft=True)


@pytest.fixture
def course_components():
    return baker.make(CourseComponent, 4)


@pytest.fixture
def course_component():
    return baker.make(CourseComponent)


@pytest.fixture
def course_with_steps(course_components):
    course = baker.make(Course)
    steps = []
    order = 1
    for component in course_components:
        steps.append(
            baker.make(
                CourseStep,
                course=course,
                component=component,
                order=order,
                make_m2m=True,
            )
        )
        order += 1
    return course, steps
