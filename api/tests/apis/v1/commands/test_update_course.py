import pytest
from django.urls import reverse
from rest_framework import status
from uuid import uuid4

from shared.enums import CommandTypes, CourseStepEvaluationType


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
            if key == "steps":
                for i, course_step in enumerate(value):
                    assert course_step["order"] == expected_result["steps"][i]["order"]
                    assert (
                        course_step["component"]
                        == expected_result["steps"][i]["component"]
                    )
            else:
                assert response[key] == value


@pytest.mark.django_db
def test_admin_updates_draft_course_description_and_steps(
    admin_client, admin_draft_course, admin, course_components
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            dict(
                order=1,
                component=str(course_components[0].uuid),
                evaluation_type=CourseStepEvaluationType.FILE_EVALUATED,
            ),
            dict(
                order=2,
                component=str(course_components[1].uuid),
                evaluation_type=CourseStepEvaluationType.SELF_EVALUATED,
            ),
            dict(
                order=3,
                component=str(course_components[2].uuid),
                evaluation_type=CourseStepEvaluationType.TEST_EVALUATED,
            ),
            dict(
                order=4,
                component=str(course_components[3].uuid),
                evaluation_type=CourseStepEvaluationType.TEACHER_EVALUATED,
            ),
        ],
    )

    _test_command_update_course(
        admin_client,
        admin_draft_course,
        command_data,
        expected_result=dict(
            description="New description",
            steps=command_data["steps"],
        ),
    )


@pytest.mark.django_db
def test_teacher_updates_own_draft_course_description_and_steps(
    teacher_client, teacher_draft_course, teacher, course_components
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            dict(
                order=1,
                component=course_components[0].uuid,
                evaluation_type=CourseStepEvaluationType.FILE_EVALUATED,
            ),
            dict(
                order=2,
                component=course_components[1].uuid,
                evaluation_type=CourseStepEvaluationType.SELF_EVALUATED,
            ),
            dict(
                order=3,
                component=course_components[2].uuid,
                evaluation_type=CourseStepEvaluationType.TEST_EVALUATED,
            ),
            dict(
                order=4,
                component=course_components[3].uuid,
                evaluation_type=CourseStepEvaluationType.TEACHER_EVALUATED,
            ),
        ],
    )

    _test_command_update_course(
        teacher_client,
        teacher_draft_course,
        command_data,
        expected_result=dict(
            description="New description",
            steps=command_data["steps"],
        ),
    )


@pytest.mark.django_db
def test_teacher_cannot_update_draft_course_not_created_by_them(
    teacher_client, other_teacher_draft_course
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            # Add your step data here
        ],
    )

    response = teacher_client.put(
        reverse(
            "api:v1:course-command",
            kwargs=dict(course_uuid=other_teacher_draft_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_student_cannot_update_draft_course(student_client, teacher_draft_course):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            # Add your step data here
        ],
    )

    response = student_client.put(
        reverse(
            "api:v1:course-command", kwargs=dict(course_uuid=teacher_draft_course.uuid)
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_admin_cannot_update_published_course(admin_client, admin_published_course):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        is_draft=False,
        steps=[
            # Add your step data here
        ],
    )

    response = admin_client.put(
        reverse(
            "api:v1:course-command",
            kwargs=dict(course_uuid=admin_published_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_teacher_cannot_update_published_course(
    teacher_client, teacher_published_course
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        is_draft=False,
        steps=[
            # Add your step data here
        ],
    )

    response = teacher_client.put(
        reverse(
            "api:v1:course-command",
            kwargs=dict(course_uuid=teacher_published_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_student_cannot_update_published_course(
    student_client, teacher_published_course, student
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        is_draft=False,
        steps=[
            # Add your step data here
        ],
    )

    response = student_client.put(
        reverse(
            "api:v1:course-command",
            kwargs=dict(course_uuid=teacher_published_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_update_non_existent_course(teacher_client):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            # Add your step data here
        ],
    )

    response = teacher_client.put(
        reverse("api:v1:course-command", kwargs=dict(course_uuid=uuid4())),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_update_course_with_invalid_data_missing_evaluation_type(
    teacher_client, teacher_draft_course, course_components
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            dict(
                order=1,
                component=str(course_components[0].uuid),
            ),
        ],
    )

    response = teacher_client.put(
        reverse(
            "api:v1:course-command", kwargs=dict(course_uuid=teacher_draft_course.uuid)
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_update_course_with_invalid_data_missing_order(
    teacher_client, teacher_draft_course, course_components
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            dict(
                component=str(course_components[0].uuid),
                evaluation_type=CourseStepEvaluationType.TEACHER_EVALUATED,
            ),
        ],
    )

    response = teacher_client.put(
        reverse(
            "api:v1:course-command", kwargs=dict(course_uuid=teacher_draft_course.uuid)
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_update_course_with_invalid_data_missing_component(
    teacher_client, teacher_draft_course, course_components
):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            dict(
                order=1,
                evaluation_type=CourseStepEvaluationType.TEACHER_EVALUATED,
            ),
        ],
    )

    response = teacher_client.put(
        reverse(
            "api:v1:course-command", kwargs=dict(course_uuid=teacher_draft_course.uuid)
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_update_course_without_authentication(client, teacher_draft_course):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        description="New description",
        steps=[
            # Add your step data here
        ],
    )

    response = client.put(
        reverse(
            "api:v1:course-command", kwargs=dict(course_uuid=teacher_draft_course.uuid)
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_update_course_with_read_only_fields(teacher_client, teacher_draft_course):
    command_data = dict(
        type=CommandTypes.UPDATE_COURSE,
        author="New author",  # Read-only field
        title="New title",  # Read-only field
        is_draft=False,
        description="New description",
        steps=[
            # Add your step data here
        ],
    )

    _test_command_update_course(
        teacher_client,
        teacher_draft_course,
        command_data,
        expected_result=dict(
            title=teacher_draft_course.title,
            description=command_data["description"],
            is_draft=command_data["is_draft"],
        ),
    )
