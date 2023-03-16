from typing import NamedTuple
import pytest
from rest_framework import status
from django.urls import reverse
from typing import Callable
from db.models.courses import Course
from shared.enums import CommandTypes


class CommandTestCase(NamedTuple):
    setup_func: Callable
    initial_data: dict
    command_data: dict
    expected_result: dict


@pytest.mark.django_db
@pytest.mark.parametrize(
    "setup_func, initial_data, command_data, expected_result",
    [
        CommandTestCase(
            setup_func=lambda: Course.objects.create(
                title="test-title", description="test-description"
            ),
            initial_data=dict(
                title="test-title", description="test-description", is_enrolled=False
            ),
            command_data=dict(type=CommandTypes.ENROLL_FOR_COURSE),
            expected_result=dict(is_enrolled=True),
        ),
        CommandTestCase(
            setup_func=lambda: Course.objects.create(
                title="test-title", description="test-description"
            ),
            initial_data=dict(
                title="test-title",
                description="test-description",
            ),
            command_data=dict(
                type=CommandTypes.UPDATE_COURSE,
                title="new-course-title",
                description="new-test-description",
            ),
            expected_result=dict(
                title="new-course-title", description="new-test-description"
            ),
        ),
    ],
)
def test_issue_command(
    setup_func, initial_data, command_data, expected_result, client, user
):
    course_obj = setup_func()
    command_data["user_id"] = user.id

    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course_obj.id))
    ).json()

    for key, value in initial_data.items():
        assert response[key] == value

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course_obj.id)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course_obj.id))
    ).json()

    for key, value in expected_result.items():
        assert response[key] == value
