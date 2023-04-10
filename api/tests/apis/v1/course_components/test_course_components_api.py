from uuid import uuid4

import pytest
from django.urls import reverse
from rest_framework import status


@pytest.fixture
def component_data():
    return {
        "title": "New course component",
        "description": "A new course component for testing",
        "type": "EXERCISE",
    }


@pytest.mark.django_db
def test_course_component_api_get(admin_client, components):
    response = admin_client.get(reverse("api:v1:component-list"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(components)


@pytest.mark.django_db
def test_course_component_detail_api_get(admin_client, components):
    component = components[0]
    response = admin_client.get(
        reverse("api:v1:component-detail", kwargs={"component_uuid": component.uuid})
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(component.uuid)


@pytest.mark.django_db
def test_course_component_detail_api_get_not_found(admin_client):
    response = admin_client.get(
        reverse("api:v1:component-detail", kwargs={"component_uuid": uuid4()})
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
