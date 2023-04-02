import json
from uuid import uuid4

import pytest
from django.urls import reverse
from rest_framework import status

from db.models import CourseComponent

from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.fixture
def tmp_uploaded_file():
    file_content = b"Dummy file content"
    uploaded_file = SimpleUploadedFile(
        "test_file.txt", file_content, content_type="text/plain"
    )
    return uploaded_file


@pytest.fixture
def course_component_data():
    return {
        "title": "New course component",
        "description": "A new course component for testing",
        "type": "EXERCISE",
    }


@pytest.mark.django_db
def test_course_component_api_get(admin_client, course_components):
    response = admin_client.get(reverse("api:v1:course-components"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(course_components)


@pytest.mark.django_db
def test_course_component_api_post(admin_client, course_component_data):
    response = admin_client.post(
        reverse("api:v1:course-components"),
        json.dumps(course_component_data),
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["title"] == course_component_data["title"]
    assert response.json()["description"] == course_component_data["description"]
    assert response.json()["type"] == course_component_data["type"]


@pytest.mark.django_db
def test_course_component_api_post_missing_data(admin_client, course_component_data):
    del course_component_data["title"]

    response = admin_client.post(
        reverse("api:v1:course-components"),
        json.dumps(course_component_data),
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_course_component_detail_api_get(admin_client, course_components):
    component = course_components[0]
    response = admin_client.get(
        reverse(
            "api:v1:course-components-detail", kwargs={"component_uuid": component.uuid}
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(component.uuid)


@pytest.mark.django_db
def test_course_component_detail_api_get_not_found(admin_client):
    response = admin_client.get(
        reverse("api:v1:course-components-detail", kwargs={"component_uuid": uuid4()})
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_course_component_detail_api_put(
    admin_client, course_components, course_component_data
):
    component = course_components[0]
    updated_data = course_component_data.copy()
    updated_data["title"] = "Updated Course Component"

    response = admin_client.put(
        reverse(
            "api:v1:course-components-detail", kwargs={"component_uuid": component.uuid}
        ),
        json.dumps(updated_data),
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["title"] == updated_data["title"]
    assert response.json()["description"] == updated_data["description"]
    assert response.json()["type"] == updated_data["type"]


@pytest.mark.django_db
def test_course_component_detail_api_delete(admin_client, course_components):
    component = course_components[0]
    response = admin_client.delete(
        reverse(
            "api:v1:course-components-detail", kwargs={"component_uuid": component.uuid}
        )
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not CourseComponent.objects.filter(uuid=component.uuid).exists()


@pytest.mark.django_db
def test_course_component_detail_file_upload_api_post(
    admin_client, course_components, tmp_uploaded_file
):
    component = course_components[0]
    response = admin_client.post(
        reverse(
            "api:v1:course-components-detail-file-resources",
            kwargs={"component_uuid": component.uuid},
        ),
        {"file": tmp_uploaded_file},
    )
    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_course_component_detail_file_upload_api_post_missing_data(
    admin_client, course_components
):
    component = course_components[0]
    response = admin_client.post(
        reverse(
            "api:v1:course-components-detail-file-resources",
            kwargs={"component_uuid": component.uuid},
        ),
        {},
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_course_component_detail_file_detail_api_delete(
    admin_client, course_components, tmp_uploaded_file
):
    component = course_components[0]
    # Upload a file first
    response = admin_client.post(
        reverse(
            "api:v1:course-components-detail-file-resources",
            kwargs={"component_uuid": component.uuid},
        ),
        {"file": tmp_uploaded_file},
    )
    resource_uuid = component.resources.first().uuid

    # Delete the file
    response = admin_client.delete(
        reverse(
            "api:v1:course-components-detail-file-resources-detail",
            kwargs={"component_uuid": component.uuid, "resource_uuid": resource_uuid},
        )
    )

    assert response.status_code == status.HTTP_200_OK
    assert component.resources.count() == 0
