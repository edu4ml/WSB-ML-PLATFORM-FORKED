from uuid import uuid4
import pytest
from django.urls import reverse
from rest_framework import status

from shared.enums import ApiErrors, CommandTypes


@pytest.mark.django_db
def test_admin_create_course(admin_client, admin):
    course_title = "New Course"
    command_data = dict(type=CommandTypes.CREATE_COURSE, title=course_title)
    response = admin_client.put(
        reverse("api:v1:course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_201_CREATED
    course = response.json()
    assert course["title"] == course_title
    assert course["is_draft"] is True
    assert course["author"] == str(admin.uuid)


@pytest.mark.django_db
def test_teacher_create_course(teacher_client, teacher):
    course_title = "New Course"
    command_data = dict(type=CommandTypes.CREATE_COURSE, title=course_title)
    response = teacher_client.put(
        reverse("api:v1:course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_201_CREATED
    course = response.json()
    assert course["title"] == course_title
    assert course["is_draft"] is True
    assert course["author"] == str(teacher.uuid)


@pytest.mark.django_db
def test_student_cannot_create_course(student_client):
    course_title = "New Course"
    command_data = dict(type=CommandTypes.CREATE_COURSE, title=course_title)
    response = student_client.put(
        reverse("api:v1:course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_unauthenticated_cannot_create_course(client):
    course_title = "New Course"
    command_data = dict(type=CommandTypes.CREATE_COURSE, title=course_title)
    response = client.put(
        reverse("api:v1:course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_course_created_as_draft_by_default(admin_client, admin):
    course_title = "New Course"
    command_data = dict(type=CommandTypes.CREATE_COURSE, title=course_title)
    response = admin_client.put(
        reverse("api:v1:course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_201_CREATED
    course = response.json()
    assert course["is_draft"] is True


@pytest.mark.django_db
def test_create_course_with_empty_title(admin_client):
    course_title = ""
    command_data = dict(type=CommandTypes.CREATE_COURSE, title=course_title)
    response = admin_client.put(
        reverse("api:v1:course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST

    response_data = response.json()
    assert response_data["error"] is True
    assert response_data["success"] is False
    assert response_data["payload"] == command_data
    assert response_data["message"] == ApiErrors.CANNOT_CREATE_COURSE_WITHOUT_TITLE
