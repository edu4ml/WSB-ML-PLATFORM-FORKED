from uuid import uuid4

import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_list_courses(admin_client, courses):
    response = admin_client.get(reverse("api:v1:course-list"))
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
def test_list_course_components(admin_client, components):
    response = admin_client.get(reverse("api:v1:component-list"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(components)


@pytest.mark.django_db
def test_get_course_component(admin_client, components):
    component = components[0]
    response = admin_client.get(
        reverse("api:v1:component-detail", kwargs={"component_uuid": component.uuid})
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(component.uuid)


@pytest.mark.django_db
def test_get_course_component_not_found(admin_client):
    response = admin_client.get(
        reverse("api:v1:component-detail", kwargs={"component_uuid": uuid4()})
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_update_course_component(admin_client, components):
    component = components[0]
    updated_data = {
        "title": "Updated Course Component",
        "description": "Updated course component for testing",
        "type": "UNKNOWN",
    }
    response = admin_client.post(
        reverse("api:v1:component-detail", kwargs={"component_uuid": component.uuid}),
        updated_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == updated_data["title"]
    assert response.json()["description"] == updated_data["description"]
    assert response.json()["type"] == updated_data["type"]


@pytest.mark.django_db
def test_update_course_component_missing_data(admin_client, components):
    component = components[0]
    updated_data = {
        "title": "Updated Course Component",
        "description": "Updated course component for testing",
    }
    response = admin_client.post(
        reverse("api:v1:component-detail", kwargs={"component_uuid": component.uuid}),
        updated_data,
        content_type="application/json",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == updated_data["title"]
    assert response.json()["description"] == updated_data["description"]
    assert response.json()["type"] == component.type


# Test DELETE method
@pytest.mark.django_db
def test_delete_course_component(admin_client, components):
    component = components[0]
    response = admin_client.delete(
        reverse("api:v1:component-detail", kwargs={"component_uuid": component.uuid})
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT
