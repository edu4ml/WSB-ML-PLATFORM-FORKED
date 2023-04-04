import pytest
from uuid import uuid4
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_get_submissions(teacher_client, submissions):
    response = teacher_client.get(reverse("api:v1:submission"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(submissions)


@pytest.mark.django_db
def test_get_submission(teacher_client, submissions):
    submission = submissions[0]
    response = teacher_client.get(
        reverse(
            "api:v1:submission-detail",
            kwargs={"submission_uuid": submission.uuid},
        )
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert response_json["uuid"] == str(submission.uuid)
    assert response_json["title"] == submission.title
    assert response_json["description"] == submission.description
    assert response_json["status"] == submission.status


@pytest.mark.django_db
def test_get_submission_attempt_not_found(teacher_client):
    response = teacher_client.get(
        reverse("api:v1:submission-detail", kwargs={"submission_uuid": uuid4()})
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
