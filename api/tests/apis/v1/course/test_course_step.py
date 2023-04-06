import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_course_step_api_get(admin_client, course_with_steps):
    course, steps = course_with_steps
    response = admin_client.get(
        reverse(
            "api:v1:course-detail-steps",
            kwargs={"course_uuid": course.uuid},
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(steps)


@pytest.mark.django_db
def test_course_step_detail_api_get(admin_client, course_with_steps):
    course, steps = course_with_steps
    step = steps[0]
    response = admin_client.get(
        reverse(
            "api:v1:course-detail-steps-detail",
            kwargs={"course_uuid": course.uuid, "step_uuid": step.uuid},
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(step.uuid)


@pytest.mark.django_db
def test_course_step_detail_submissions_api_get(admin_client, course_with_steps):
    course, steps = course_with_steps
    step = steps[0]
    response = admin_client.get(
        reverse(
            "api:v1:course-detail-steps-detail-submissions",
            kwargs={"course_uuid": course.uuid, "step_uuid": step.uuid},
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 0
    # Fix me. This test is dummy and not working
    # assert response.json()[0]["uuid"] == str(user_progress.uuid)
