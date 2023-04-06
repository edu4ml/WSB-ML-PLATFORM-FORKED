import pytest
from rest_framework import status
from shared.enums import ApiErrors, CommandTypes


@pytest.mark.django_db
def test_admin_create_component(admin_client, admin, create_component):
    component_payload = {
        "title": "New Component",
        "description": "Component Description",
    }
    response = create_component(admin_client, **component_payload)
    assert response.status_code == status.HTTP_202_ACCEPTED
    component = response.json()
    assert component["title"] == component_payload["title"]
    assert component["description"] == component_payload["description"]
    assert component["author"] == str(admin.uuid)


@pytest.mark.django_db
def test_teacher_create_component(teacher_client, teacher, create_component):
    component_payload = {
        "title": "New Component",
        "description": "Component Description",
    }
    response = create_component(teacher_client, **component_payload)
    assert response.status_code == status.HTTP_202_ACCEPTED
    component = response.json()
    assert component["title"] == component_payload["title"]
    assert component["description"] == component_payload["description"]
    assert component["author"] == str(teacher.uuid)


@pytest.mark.django_db
def test_student_cannot_create_component(student_client, create_component):
    component_payload = {
        "title": "New Component",
        "description": "Component Description",
    }
    response = create_component(student_client, **component_payload)
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_unauthenticated_cannot_create_component(client, create_component):
    component_payload = {
        "title": "New Component",
        "description": "Component Description",
    }
    response = create_component(client, **component_payload)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_create_component_with_empty_title(admin_client, create_component):
    component_payload = {"title": "", "description": "Component Description"}
    response = create_component(admin_client, **component_payload)
    assert response.status_code == status.HTTP_400_BAD_REQUEST

    response_data = response.json()
    assert response_data["error"] is True
    assert response_data["success"] is False
    assert response_data["payload"] == dict(
        title=component_payload["title"],
        description=component_payload["description"],
        type=CommandTypes.CREATE_COMPONENT,
    )
    assert response_data["message"] == ApiErrors.COMPONENT_MISSING_DATA
