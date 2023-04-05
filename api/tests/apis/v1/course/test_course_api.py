from uuid import uuid4

import pytest
from django.urls import reverse
from rest_framework import status

from shared.enums import ApiErrors, CommandTypes, CourseComponentType


@pytest.mark.django_db
def test_list_courses(admin_client, courses):
    response = admin_client.get(reverse("api:v1:course"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(courses)


@pytest.mark.django_db
def test_retrieve_courses(admin_client, courses):
    course = courses[0]
    response = admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid))
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()

    assert data["title"] == course.title
    assert data["description"] == course.description
    assert data["is_draft"] == course.is_draft


@pytest.mark.django_db
def test_retrieve_courses_not_found(admin_client):
    response = admin_client.get(
        reverse(
            "api:v1:course-detail",
            kwargs=dict(course_uuid=uuid4()),
        )
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == dict()


@pytest.mark.django_db
def test_issue_enroll_for_course(admin_client, admin, courses):
    course = courses[0]

    command_data = dict(type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=admin.uuid)

    response = admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid))
    )
    assert response.json().get("is_enrolled") is False

    response = admin_client.post(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid))
    )
    assert response.json().get("is_enrolled") is True


@pytest.mark.django_db
def test_issue_complete_course_step(admin_client, admin, course_with_steps):
    course, _ = course_with_steps

    response = admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid))
    )
    assert response.json()["steps"][0]["user_progress"]["is_completed"] is False
    progress_tracking_uuid = response.json()["steps"][0]["user_progress"][
        "tracking_uuid"
    ]

    command_data = dict(
        type=CommandTypes.COMPLETE_COURSE_STEP,
        progress_tracking_uuid=progress_tracking_uuid,
    )

    response = admin_client.post(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid))
    )
    assert response.json()["steps"][0]["user_progress"]["is_completed"] is True


@pytest.mark.django_db
def test_raise_exception_when_course_command_unknown(admin_client, courses):
    course = courses[0]
    command_data = dict(type="DUMMY-UNKNOWN-COMMAND", foo="bar")

    response = admin_client.post(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course.uuid)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == dict(
        message=ApiErrors.COMMAND_TYPE_NOT_SUPPORTED,
        error=True,
        success=False,
        payload=command_data,
    )


@pytest.mark.django_db
def test_list_course_components(admin_client, course_components):
    response = admin_client.get(reverse("api:v1:course-components"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(course_components)


@pytest.mark.django_db
def test_create_course_component_with_valid_data(admin_client):
    course_component_data = dict(
        title="New course component",
        description="A new course component for testing",
        type=CourseComponentType.EXERCISE,
    )

    response = admin_client.post(
        reverse("api:v1:course-components"),
        course_component_data,
        content_type="application/json",
    )

    assert response.status_code == status.HTTP_202_ACCEPTED
    assert response.json()["title"] == course_component_data["title"]
    assert response.json()["description"] == course_component_data["description"]
    assert response.json()["type"] == course_component_data["type"]


@pytest.mark.django_db
def test_create_course_component_with_missing_data(admin_client):

    course_component_data = dict(
        description="A new course component for testing",
        type=CourseComponentType.EXERCISE,
    )

    response = admin_client.post(
        reverse("api:v1:course-components"),
        course_component_data,
        content_type="application/json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_get_course_component(admin_client, course_components):
    component = course_components[0]
    response = admin_client.get(
        reverse(
            "api:v1:course-components-detail", kwargs={"component_uuid": component.uuid}
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(component.uuid)


@pytest.mark.django_db
def test_get_course_component_not_found(admin_client):
    response = admin_client.get(
        reverse("api:v1:course-components-detail", kwargs={"component_uuid": uuid4()})
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_update_course_component(admin_client, course_components):
    component = course_components[0]
    updated_data = {
        "title": "Updated Course Component",
        "description": "Updated course component for testing",
        "type": "UNKNOWN",
    }
    response = admin_client.post(
        reverse(
            "api:v1:course-components-detail", kwargs={"component_uuid": component.uuid}
        ),
        updated_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == updated_data["title"]
    assert response.json()["description"] == updated_data["description"]
    assert response.json()["type"] == updated_data["type"]


@pytest.mark.django_db
def test_update_course_component_missing_data(admin_client, course_components):
    component = course_components[0]
    updated_data = {
        "title": "Updated Course Component",
        "description": "Updated course component for testing",
    }
    response = admin_client.post(
        reverse(
            "api:v1:course-components-detail", kwargs={"component_uuid": component.uuid}
        ),
        updated_data,
        content_type="application/json",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == updated_data["title"]
    assert response.json()["description"] == updated_data["description"]
    assert response.json()["type"] == component.type


# Test DELETE method
@pytest.mark.django_db
def test_delete_course_component(admin_client, course_components):
    component = course_components[0]
    response = admin_client.delete(
        reverse(
            "api:v1:course-components-detail", kwargs={"component_uuid": component.uuid}
        )
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT
