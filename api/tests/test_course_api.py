import pytest
from rest_framework import status
from django.urls import reverse
from elearning.coursing.commands.create_course import CreateCourse
from elearning.coursing.commands.enroll_for_course import EnrollForCourse
from elearning.coursing.commands.complete_course_step import CompleteCourseStep


@pytest.mark.django_db
def test_list_courses(client, courses):
    response = client.get(reverse("course"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(courses)


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
def test_retrieve_courses_not_found(client):
    response = client.get(
        reverse(
            "course-detail",
            kwargs=dict(course_id="29439ec0-0ed9-4268-9860-047103ffad65"),
        )
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == dict()


@pytest.mark.django_db
def test_issue_enroll_for_course(client, user, courses):
    course = courses[0]

    command_data = dict(type=EnrollForCourse.Meta.name, user_id=user.id)

    response = client.get(reverse("course-detail", kwargs=dict(course_id=course.id)))
    assert response.json().get("is_enrolled") == False

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course.id)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = client.get(reverse("course-detail", kwargs=dict(course_id=course.id)))
    assert response.json().get("is_enrolled") == True


@pytest.mark.django_db
def test_issue_complete_course_step(client, user, course_with_steps):
    course, steps = course_with_steps

    response = client.get(reverse("course-detail", kwargs=dict(course_id=course.id)))
    assert response.json()["steps"][0]["user_progress"]["is_completed"] == False
    progress_tracking_id = response.json()["steps"][0]["user_progress"]["tracking_id"]

    command_data = dict(
        type=CompleteCourseStep.Meta.name,
        progress_tracking_id=progress_tracking_id,
    )

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course.id)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = client.get(reverse("course-detail", kwargs=dict(course_id=course.id)))
    assert response.json()["steps"][0]["user_progress"]["is_completed"] == True


@pytest.mark.django_db
def test_issue_create_course_command(client):
    command_data = dict(
        type=CreateCourse.Meta.name,
        title="TEST-COURSE-TITLE",
        description="TEST-COURSE-DESCRIPTION",
    )

    response = client.put(
        reverse("course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_201_CREATED

    data = response.json()

    assert data["title"] == "TEST-COURSE-TITLE"
    assert data["description"] == "TEST-COURSE-DESCRIPTION"
    assert data["is_draft"] == True


@pytest.mark.django_db
def test_raise_exception_when_course_command_unknown(client, courses):
    course = courses[0]
    command_data = dict(type="DUMMY-UNKNOWN-COMMAND", foo="bar")

    response = client.put(
        reverse("course"),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_501_NOT_IMPLEMENTED
    assert response.json() == dict(
        message="NotImplemented", error=True, success=False, payload=command_data
    )

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course.id)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_501_NOT_IMPLEMENTED
    assert response.json() == dict(
        message="NotImplemented", error=True, success=False, payload=command_data
    )
