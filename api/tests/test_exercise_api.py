import pytest
from rest_framework import status
from django.urls import reverse


@pytest.mark.django_db
def test_list_exercises(client, exercises):
    response = client.get(reverse("exercise"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(exercises)


@pytest.mark.django_db
def test_retrieve_exercise(client, exercises):
    exercise = exercises[0]
    response = client.get(
        reverse("exercise-detail", kwargs=dict(exercise_id=exercise.id))
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()

    assert data["title"] == exercise.title
    assert data["description"] == exercise.description


@pytest.mark.django_db
def test_retrieve_exercise_not_found(client):
    response = client.get(reverse("exercise-detail", kwargs=dict(exercise_id=1)))
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == dict()
