from uuid import uuid4
from django.urls import reverse
import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status

from db.models.external_resources import ExternalResource


@pytest.mark.django_db
def test_teacher_can_list_external_resources(teacher_client, external_resources):
    response = teacher_client.get(reverse("api:v1:external-resource"))
    assert response.status_code == status.HTTP_200_OK

    assert len(response.json()) == len(external_resources)


@pytest.mark.django_db
def test_student_can_list_external_resources(student_client, external_resources):
    response = student_client.get(reverse("api:v1:external-resource"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(external_resources)


@pytest.mark.django_db
def test_admin_cannot_list_external_resources(admin_client, external_resources):
    response = admin_client.get(reverse("api:v1:external-resource"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(external_resources)


@pytest.mark.django_db
def test_unauthenticated_user_cannot_list_external_resources(client):
    response = client.get(reverse("api:v1:external-resource"))
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_create_external_resource_valid_data(admin_client, teacher_client):
    for client in [admin_client, teacher_client]:
        resource_data = {
            "title": "Sample Resource",
            "url": "https://example.com/resource",
            "file": SimpleUploadedFile("test_file.txt", b"file_content"),
        }
        response = client.post(reverse("api:v1:external-resource"), resource_data)
        assert response.status_code == status.HTTP_201_CREATED
        response_data = response.json()

        assert response_data["title"] == resource_data["title"]
        assert response_data["url"] == resource_data["url"]
        assert "test_file.txt" in response_data["file_link"]

        # cleanup
        for resource in ExternalResource.objects.all():
            resource.file.delete()


@pytest.mark.django_db
def test_create_external_resource_invalid_data(admin_client, teacher_client):
    invalid_resource_data = [
        {"title": "Sample Resource", "url": "invalid_url"},
        {"title": "", "url": "https://example.com/resource"},
    ]

    for client in [admin_client, teacher_client]:
        for data in invalid_resource_data:
            response = client.post(reverse("api:v1:external-resource"), data)
            assert response.status_code == status.HTTP_400_BAD_REQUEST
            response_data = response.json()
            assert response_data["error"] is True


@pytest.mark.django_db
def test_student_cannot_create_external_resource(student_client):
    resource_data = {
        "title": "Sample Resource",
        "url": "https://example.com/resource",
        "file": SimpleUploadedFile("test_file.txt", b"file_content"),
    }
    response = student_client.post(reverse("api:v1:external-resource"), resource_data)
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_unauthenticated_user_cannot_create_external_resource(client):
    resource_data = {
        "title": "Sample Resource",
        "url": "https://example.com/resource",
        "file": SimpleUploadedFile("test_file.txt", b"file_content"),
    }
    response = client.post(reverse("api:v1:external-resource"), resource_data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_teacher_can_update_existing_external_resource_with_valid_data(teacher_client):
    resource = ExternalResource.objects.create(
        title="Original Resource",
        url="https://example.com/original",
        file=SimpleUploadedFile("original_file.txt", b"original_content"),
    )

    updated_data = {
        "title": "Updated Resource",
        "url": "https://example.com/updated",
        "file": SimpleUploadedFile("updated_file.txt", b"updated_content"),
    }

    response = teacher_client.post(
        reverse(
            "api:v1:external-resource-detail",
            kwargs=dict(resource_uuid=str(resource.uuid)),
        ),
        updated_data,
    )
    assert response.status_code == status.HTTP_200_OK

    resource.refresh_from_db()
    assert resource.title == updated_data["title"]
    assert resource.url == updated_data["url"]
    assert "updated_file.txt" in resource.file.url

    # Cleanup
    resource.file.delete()


# ---


@pytest.mark.django_db
def test_teacher_cannot_update_external_resource_with_invalid_data(teacher_client):
    resource = ExternalResource.objects.create(
        title="Original Resource",
        url="https://example.com/original",
        file=SimpleUploadedFile("original_file.txt", b"original_content"),
    )

    invalid_data_list = [
        {"uuid": resource.uuid, "title": "", "url": "https://example.com/updated"},
        {"uuid": resource.uuid, "title": "Updated Resource", "url": "invalid_url"},
    ]

    for invalid_data in invalid_data_list:
        response = teacher_client.post(
            reverse(
                "api:v1:external-resource-detail",
                kwargs=dict(resource_uuid=resource.uuid),
            ),
            invalid_data,
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    # Cleanup
    resource.file.delete()


@pytest.mark.django_db
def test_teacher_cannot_update_non_existent_external_resource(teacher_client):
    non_existent_id = 9999
    updated_data = {
        "id": non_existent_id,
        "title": "Updated Resource",
        "url": "https://example.com/updated",
        "file": SimpleUploadedFile("updated_file.txt", b"updated_content"),
    }

    response = teacher_client.post(
        reverse("api:v1:external-resource-detail", kwargs=dict(resource_uuid=uuid4())),
        updated_data,
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_student_cannot_update_external_resource(student_client):
    resource = ExternalResource.objects.create(
        title="Original Resource",
        url="https://example.com/original",
        file=SimpleUploadedFile("original_file.txt", b"original_content"),
    )

    updated_data = {
        "title": "Updated Resource",
        "url": "https://example.com/updated",
        "file": SimpleUploadedFile("updated_file.txt", b"updated_content"),
    }

    response = student_client.post(
        reverse(
            "api:v1:external-resource-detail",
            kwargs=dict(resource_uuid=str(resource.uuid)),
        ),
        updated_data,
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN

    # Cleanup
    resource.file.delete()


@pytest.mark.django_db
def test_unauthenticated_user_cannot_update_external_resource(client):
    resource = ExternalResource.objects.create(
        title="Original Resource",
        url="https://example.com/original",
        file=SimpleUploadedFile("original_file.txt", b"original_content"),
    )

    updated_data = {
        "title": "Updated Resource",
        "url": "https://example.com/updated",
        "file": SimpleUploadedFile("updated_file.txt", b"updated_content"),
    }

    response = client.post(
        reverse(
            "api:v1:external-resource-detail", kwargs=dict(resource_uuid=resource.uuid)
        ),
        updated_data,
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # Cleanup
    resource.file.delete()


@pytest.mark.django_db
def test_teacher_can_delete_existing_external_resource(teacher_client):
    resource = ExternalResource.objects.create(
        title="Resource to Delete",
        url="https://example.com/delete",
        file=SimpleUploadedFile("delete_file.txt", b"delete_content"),
    )

    response = teacher_client.delete(
        reverse(
            "api:v1:external-resource-detail", kwargs=dict(resource_uuid=resource.uuid)
        ),
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not ExternalResource.objects.filter(uuid=resource.uuid).exists()


@pytest.mark.django_db
def test_teacher_cannot_delete_non_existent_external_resource(teacher_client):
    response = teacher_client.delete(
        reverse("api:v1:external-resource-detail", kwargs=dict(resource_uuid=uuid4())),
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_student_cannot_delete_external_resource(student_client):
    resource = ExternalResource.objects.create(
        title="Resource to Delete",
        url="https://example.com/delete",
        file=SimpleUploadedFile("delete_file.txt", b"delete_content"),
    )

    response = student_client.delete(
        reverse(
            "api:v1:external-resource-detail", kwargs=dict(resource_uuid=resource.uuid)
        ),
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN

    # Cleanup
    resource.file.delete()


@pytest.mark.django_db
def test_unauthenticated_user_cannot_delete_external_resource(client):
    resource = ExternalResource.objects.create(
        title="Resource to Delete",
        url="https://example.com/delete",
        file=SimpleUploadedFile("delete_file.txt", b"delete_content"),
    )

    response = client.delete(
        reverse(
            "api:v1:external-resource-detail", kwargs=dict(resource_uuid=resource.uuid)
        ),
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # Cleanup
    resource.file.delete()
