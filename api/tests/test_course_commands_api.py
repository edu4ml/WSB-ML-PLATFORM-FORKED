from typing import List, NamedTuple
import pytest
from rest_framework import status
from django.urls import reverse
from typing import Callable
from db.models.courses import Course, CourseStep
from db.models.exercises import Exercise
from shared.enums import CommandTypes
from django.contrib.contenttypes.models import ContentType


class CommandTestCase(NamedTuple):
    setup_func: List[Callable]
    initial_data: dict
    command_data: dict
    expected_result: dict


@pytest.mark.django_db
@pytest.mark.parametrize(
    "setup_func, initial_data, command_data, expected_result",
    [
        CommandTestCase(
            setup_func=[
                lambda: Course.objects.create(
                    title="test-title", description="test-description"
                )
            ],
            initial_data=dict(
                title="test-title", description="test-description", is_enrolled=False
            ),
            command_data=dict(type=CommandTypes.ENROLL_FOR_COURSE),
            expected_result=dict(is_enrolled=True),
        ),
        # Update course simple properties (title, description, is_draft)
        CommandTestCase(
            setup_func=[
                lambda: Course.objects.create(
                    title="test-title", description="test-description"
                )
            ],
            initial_data=dict(
                title="test-title",
                description="test-description",
            ),
            command_data=dict(
                type=CommandTypes.UPDATE_COURSE,
                title="new-test-title",
                description="new-test-description",
            ),
            expected_result=dict(
                description="new-test-description", title="new-test-title"
            ),
        ),
    ],
)
def test_issue_command(
    setup_func, initial_data, command_data, expected_result, client, user
):
    # this might be a bit hacky. Assuming that first callable returns course resource
    # The rest of callables are for other resources
    resources = []
    for callable in setup_func:
        resources.append(callable())
    course_obj = resources[0]

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


@pytest.mark.django_db
def test_issue_update_command_remove_steps(client, course_with_steps):
    course, steps = course_with_steps

    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course.id))
    ).json()

    assert len(response["steps"]) > 1
    assert response["steps"][0]["title"] == steps[0].step_object.title

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course.id)),
        dict(
            type=CommandTypes.UPDATE_COURSE,
            steps=[],
        ),
        content_type="application/json",
    )
    print(response.json())
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course.id))
    ).json()

    assert response["steps"] == []


@pytest.mark.django_db
def test_issue_update_command_add_steps(client, course, exercises):
    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course.id))
    ).json()

    assert len(response["steps"]) == 0

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course.id)),
        dict(
            type=CommandTypes.UPDATE_COURSE,
            steps=[
                dict(
                    order=1,
                    id=exercises[0].id,
                    content_type=ContentType.objects.get_for_model(Exercise).model,
                ),
                dict(
                    order=2,
                    id=exercises[1].id,
                    content_type=ContentType.objects.get_for_model(Exercise).model,
                ),
                dict(
                    order=3,
                    id=exercises[2].id,
                    content_type=ContentType.objects.get_for_model(Exercise).model,
                ),
            ],
        ),
        content_type="application/json",
    )
    print(response.json())
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course.id))
    ).json()

    assert len(response["steps"]) == 3


@pytest.mark.django_db
def test_issue_update_command_remove_reorder_and_add_steps(
    client, course_with_steps, exercises
):
    course, steps = course_with_steps

    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course.id))
    ).json()

    len(CourseStep.objects.all()) == 10
    assert len(response["steps"]) == 10
    assert response["steps"][0]["title"] == steps[0].step_object.title

    response = client.put(
        reverse("course-command", kwargs=dict(course_id=course.id)),
        dict(
            type=CommandTypes.UPDATE_COURSE,
            steps=[
                dict(
                    order=1,
                    id=exercises[0].id,
                    content_type=ContentType.objects.get_for_model(Exercise).model,
                ),
                dict(
                    order=2,
                    id=exercises[1].id,
                    content_type=ContentType.objects.get_for_model(Exercise).model,
                ),
                dict(
                    order=3,
                    id=exercises[2].id,
                    content_type=ContentType.objects.get_for_model(Exercise).model,
                ),
            ],
        ),
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response = client.get(
        reverse("course-detail", kwargs=dict(course_id=course.id))
    ).json()

    assert len(response["steps"]) == 3

    len(CourseStep.objects.all()) == 3
