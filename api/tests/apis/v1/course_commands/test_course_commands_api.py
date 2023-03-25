from typing import Callable, List, NamedTuple

import pytest
from django.urls import reverse
from rest_framework import status

from shared.enums import CommandTypes, CourseStepEvaluationTypes


class CommandTestCase(NamedTuple):
    setup_func: List[Callable]
    initial_data: dict
    command_data: dict
    expected_result: dict


def _test_command(
    admin_client, course_obj, command_data, initial_data=dict(), expected_result=dict()
):
    # Assert on initial data
    response = get_course(admin_client, course_obj)

    for key, value in initial_data.items():
        assert response[key] == value

    # Send command
    response = admin_client.put(
        reverse("api:v1:course-command", kwargs=dict(course_uuid=course_obj.uuid)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    # Assert on expected result
    response = get_course(admin_client, course_obj)

    for key, value in expected_result.items():
        assert response[key] == value


def get_course(admin_client, course_obj):
    return admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course_obj.uuid))
    ).json()


@pytest.mark.django_db
def test_issue_enroll_command(admin_client, course, admin):
    initial_data = dict(
        is_enrolled=False, title=course.title, description=course.description
    )
    command_data = dict(type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=admin.uuid)
    expected_result = dict(is_enrolled=True)

    _test_command(
        admin_client=admin_client,
        course_obj=course,
        initial_data=initial_data,
        command_data=command_data,
        expected_result=expected_result,
    )


@pytest.mark.django_db
def test_issue_update_course_properties_command(admin_client, course, admin):
    initial_data = dict(
        title=course.title, description=course.description, is_draft=True
    )
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        title="new-test-title",
        description="new-test-description",
        is_draft=False,
        user_uuid=admin.uuid,
    )
    expected_result = dict(
        is_draft=False, description="new-test-description", title="new-test-title"
    )

    _test_command(
        admin_client=admin_client,
        course_obj=course,
        initial_data=initial_data,
        command_data=command_data,
        expected_result=expected_result,
    )


@pytest.mark.django_db
def test_issue_update_command_remove_steps(admin_client, course_with_steps):
    course, steps = course_with_steps
    command_data = dict(type=CommandTypes.UPDATE_COURSE, steps=[])

    response = get_course(admin_client, course)
    assert len(response["steps"]) == len(steps)

    _test_command(
        admin_client=admin_client,
        course_obj=course,
        command_data=command_data,
    )

    response = get_course(admin_client, course)
    assert len(response["steps"]) == len(command_data["steps"])


@pytest.mark.django_db
def test_issue_update_command_add_steps(admin_client, course, course_components):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
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

    response = get_course(admin_client, course)
    assert len(response["steps"]) == 0

    _test_command(
        admin_client=admin_client,
        course_obj=course,
        command_data=command_data,
    )

    response = get_course(admin_client, course)
    assert len(response["steps"]) == len(command_data["steps"])
