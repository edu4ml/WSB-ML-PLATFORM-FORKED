import pytest
from django.urls import reverse
from shared.enums import CommandTypes, CourseStepEvaluationStatus
from rest_framework import status


@pytest.mark.django_db
def test_admin_approve_submission(admin_client, submission):
    command_data = dict(
        type=CommandTypes.APPROVE_SUBMISSION, submission_uuid=submission.uuid
    )

    response = admin_client.post(
        reverse("api:v1:command-list"),
        command_data,
    )

    assert response.status_code == status.HTTP_202_ACCEPTED
    assert response.json()["status"] == CourseStepEvaluationStatus.PASSED
