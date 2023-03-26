import pytest
from django.urls import reverse
from rest_framework import status
from uuid import uuid4

from shared.enums import ApiErrors, CommandTypes, CourseStepEvaluationTypes


def get_course(admin_client, course_obj):
    return admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course_obj.uuid))
    ).json()


def _test_command_update_course(
    client,
    course_obj,
    command_data,
    initial_data=dict(),
    expected_result=dict(),
    expected_status_code=status.HTTP_202_ACCEPTED,
):
    # Assert on initial data
    response = get_course(client, course_obj)

    for key, value in initial_data.items():
        assert response[key] == value

    # Send command
    response = client.put(
        reverse("api:v1:course-command", kwargs=dict(course_uuid=course_obj.uuid)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == expected_status_code

    # Assert on expected result
    if expected_status_code == status.HTTP_202_ACCEPTED:
        response = get_course(client, course_obj)
        for key, value in expected_result.items():
            assert response[key] == value


@pytest.mark.django_db
def test_admin_updates_draft_course_description_and_steps(
    admin_client, draft_course, admin, course_components
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            dict(
                order=1,
                component=course_components[0].uuid,
                evaluation_type=CourseStepEvaluationTypes.FILE_EVALUATED,
            ),
            dict(
                order=2,
                component=course_components[1].uuid,
                evaluation_type=CourseStepEvaluationTypes.SELF_EVALUATED,
            ),
            dict(
                order=3,
                component=course_components[2].uuid,
                evaluation_type=CourseStepEvaluationTypes.TEST_EVALUATED,
            ),
            dict(
                order=4,
                component=course_components[3].uuid,
                evaluation_type=CourseStepEvaluationTypes.TEACHER_EVALUATED,
            ),
        ],
    )

    _test_command_update_course(
        admin_client,
        draft_course,
        command_data,
        expected_description="New description",
        expected_steps=command_data["steps"],
    )
