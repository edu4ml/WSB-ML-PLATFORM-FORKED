from uuid import uuid4
import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_list_exercises(admin_client, exercises):
    response = admin_client.get(reverse("exercise"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(exercises)


@pytest.mark.django_db
def test_retrieve_exercise(admin_client, exercises):
    exercise = exercises[0]
    response = admin_client.get(
        reverse("exercise-detail", kwargs=dict(exercise_uuid=exercise.uuid))
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()

    assert data["title"] == exercise.title
    assert data["description"] == exercise.description


@pytest.mark.django_db
def test_retrieve_exercise_not_found(admin_client):
    response = admin_client.get(
        reverse(
            "exercise-detail",
            kwargs=dict(exercise_uuid=uuid4()),
        )
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == dict()
