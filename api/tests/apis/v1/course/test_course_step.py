import pytest
from django.urls import reverse
from rest_framework import status

from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.fixture
def tmp_uploaded_file():
    file_content = b"Dummy file content"
    uploaded_file = SimpleUploadedFile(
        "test_file.txt", file_content, content_type="text/plain"
    )
    return uploaded_file


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


# @pytest.mark.django_db
# def test_course_step_user_progress_details_api_get(admin_client, course_with_steps):
#     course, steps = course_with_steps
#     step = steps[0]

#     response = admin_client.get(
#         reverse(
#             "api:v1:course-step-user-progress-details",
#             kwargs={"user_progress_uuid": user_progress.uuid},
#         )
#     )
#     assert response.status_code == status.HTTP_200_OK
#     assert response.json()["uuid"] == str(user_progress.uuid)


# @pytest.mark.django_db
# def test_course_step_user_progress_submission_upload_api_post(
#     admin, admin_client, course_with_steps, tmp_uploaded_file
# ):
#     step = course_with_steps[1][0]

#     user_progress = CourseStepUserProgress.objects.create(
#         step__id=step.uuid, user=admin
#     )

#     response = admin_client.post(
#         reverse(
#             "api:v1:course-step-user-progress-submission-upload",
#             kwargs={"user_progress_uuid": user_progress.uuid},
#         ),
#         {"file": tmp_uploaded_file},
#     )
#     assert response.status_code == status.HTTP_201_CREATED
#     assert response.json()["uuid"] == str(user_progress.uuid)
#     assert response.json()["submissions"][-1]["file"] == "test_file.txt"
