from uuid import uuid4
import pytest
from django.urls import reverse
from rest_framework import status

from shared.enums import ApiErrors, CommandTypes


def get_course(admin_client, course_obj):
    return admin_client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course_obj.uuid))
    ).json()


def _test_command(
    admin_client, course_obj, command_data, initial_data=dict(), expected_result=dict()
):
    # Assert on initial data
    response = get_course(admin_client, course_obj)

    for key, value in initial_data.items():
        assert response[key] == value

    # Send command
    response = admin_client.post(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course_obj.uuid)),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    # Assert on expected result
    response = get_course(admin_client, course_obj)

    for key, value in expected_result.items():
        assert response[key] == value


@pytest.mark.django_db
def test_issue_enroll_command(admin_client, admin_published_course, admin):
    initial_data = dict(
        is_enrolled=False,
        title=admin_published_course.title,
        description=admin_published_course.description,
    )
    command_data = dict(type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=admin.uuid)
    expected_result = dict(is_enrolled=True)

    _test_command(
        admin_client=admin_client,
        course_obj=admin_published_course,
        initial_data=initial_data,
        command_data=command_data,
        expected_result=expected_result,
    )


@pytest.mark.django_db
def test_enroll_in_published_course_teacher(
    teacher_client, admin_published_course, teacher
):
    initial_data = dict(is_enrolled=False)
    command_data = dict(type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=teacher.uuid)
    expected_result = dict(is_enrolled=True)

    _test_command(
        admin_client=teacher_client,
        course_obj=admin_published_course,
        initial_data=initial_data,
        command_data=command_data,
        expected_result=expected_result,
    )


@pytest.mark.django_db
def test_enroll_in_published_course_student(
    student_client, admin_published_course, student
):
    initial_data = dict(is_enrolled=False)
    command_data = dict(type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=student.uuid)
    expected_result = dict(is_enrolled=True)

    _test_command(
        admin_client=student_client,
        course_obj=admin_published_course,
        initial_data=initial_data,
        command_data=command_data,
        expected_result=expected_result,
    )


@pytest.mark.django_db
def test_enroll_in_draft_course_teacher(teacher_client, admin_draft_course, teacher):
    command_data = dict(
        type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=str(teacher.uuid)
    )

    response = teacher_client.post(
        reverse(
            "api:v1:course-detail", kwargs=dict(course_uuid=admin_draft_course.uuid)
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response_data = response.json()
    assert response_data["error"] is True
    assert response_data["success"] is False
    assert response_data["payload"] == command_data
    assert response_data["message"] == ApiErrors.CANNOT_ENROLL_FOR_COURSE_IN_DRAFT


@pytest.mark.django_db
def test_enroll_in_draft_course_student(student_client, admin_draft_course, student):
    command_data = dict(
        type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=str(student.uuid)
    )

    response = student_client.post(
        reverse(
            "api:v1:course-detail", kwargs=dict(course_uuid=admin_draft_course.uuid)
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response_data = response.json()
    assert response_data["error"] is True
    assert response_data["success"] is False
    assert response_data["payload"] == command_data
    assert response_data["message"] == ApiErrors.CANNOT_ENROLL_FOR_COURSE_IN_DRAFT


@pytest.mark.django_db
def test_enroll_twice(teacher_client, admin_published_course, teacher):
    command_data = dict(
        type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=str(teacher.uuid)
    )

    # Enroll once
    response = teacher_client.post(
        reverse(
            "api:v1:course-detail",
            kwargs=dict(course_uuid=admin_published_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    # Enroll again
    response = teacher_client.post(
        reverse(
            "api:v1:course-detail",
            kwargs=dict(course_uuid=admin_published_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response_data = response.json()
    assert response_data["error"] is True
    assert response_data["success"] is False
    assert response_data["payload"] == command_data
    assert (
        response_data["message"] == ApiErrors.CANNOT_ENROLL_FOR_COURSE_ALREADY_ENROLLED
    )


@pytest.mark.django_db
def test_enroll_in_non_existent_course(teacher_client, teacher):
    command_data = dict(
        type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=str(teacher.uuid)
    )

    response = teacher_client.post(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=uuid4())),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response_data = response.json()
    assert response_data["error"] is True
    assert response_data["success"] is False
    assert response_data["payload"] == command_data
    assert response_data["message"] == ApiErrors.COMMAND_TYPE_HAS_NO_PARENT


@pytest.mark.django_db
def test_enroll_without_authentication(client, admin_published_course):
    command_data = dict(type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=None)

    response = client.post(
        reverse(
            "api:v1:course-detail",
            kwargs=dict(course_uuid=admin_published_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_enroll_with_invalid_user_uuid(teacher_client, admin_published_course):
    command_data = dict(type=CommandTypes.ENROLL_FOR_COURSE, user_uuid=str(uuid4()))

    response = teacher_client.post(
        reverse(
            "api:v1:course-detail",
            kwargs=dict(course_uuid=admin_published_course.uuid),
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response_data = response.json()
    assert response_data["error"] is True
    assert response_data["success"] is False
    assert response_data["payload"] == command_data
    assert response_data["message"] == ApiErrors.USER_DOES_NOT_EXIST
