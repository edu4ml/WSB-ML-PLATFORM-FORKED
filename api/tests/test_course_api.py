import pytest
from rest_framework import status
from django.urls import reverse

from elearning.courses.commands.create_course import CreateCourse


@pytest.mark.django_db
def test_list_courses(client, courses):
    response = client.get(reverse("course"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 10


@pytest.mark.django_db
def test_retrieve_courses(client, courses):
    course = courses[0]
    response = client.get(reverse("course-detail", kwargs=dict(course_id=course.id)))
    assert response.status_code == status.HTTP_200_OK
    data = response.json()

    assert data["title"] == course.title
    assert data["description"] == course.description
    assert data["is_draft"] == course.is_draft


@pytest.mark.django_db
def test_issue_create_course_command(client, courses):
    course = courses[0]
    command_data = dict(
        type=CreateCourse.Meta.name, title="TEST TITLE", description="TEST_DESCRIPTION"
    )

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course.id)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED
