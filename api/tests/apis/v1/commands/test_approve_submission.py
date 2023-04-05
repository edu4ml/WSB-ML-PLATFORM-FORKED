import pytest
from django.urls import reverse
from shared.enums import CommandTypes, CourseStepEvaluationStatus
from rest_framework import status


@pytest.mark.django_db
def test_admin_approve_submission(admin_client, submissions):
    submission = submissions[0]
    command_data = dict(type=CommandTypes.APPROVE_SUBMISSION)

    response = admin_client.post(
        reverse(
            "api:v1:submission-detail", kwargs=dict(submission_uuid=submission.uuid)
        ),
        command_data,
    )

    assert response.status_code == status.HTTP_202_ACCEPTED
    assert response.json()["status"] == CourseStepEvaluationStatus.PASSED
