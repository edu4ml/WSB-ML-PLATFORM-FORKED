import json

import pytest
from django.urls import reverse
from rest_framework import status

from shared.enums import CommandTypes


# Test UPDATE_COURSE command
@pytest.mark.django_db
def test_update_course_command_student(student_client, admin_published_course):
    data = json.dumps({"type": CommandTypes.UPDATE_COURSE})
    response = student_client.put(
        reverse(
            "api:v1:course-command", kwargs={"course_uuid": admin_published_course.uuid}
        ),
        data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.json()


@pytest.mark.django_db
def test_update_course_command_teacher(teacher_client, teacher_draft_course):
    data = json.dumps({"type": CommandTypes.UPDATE_COURSE, "steps": []})
    response = teacher_client.put(
        reverse(
            "api:v1:course-command",
            kwargs={"course_uuid": teacher_draft_course.uuid},
        ),
        data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED, response.json()


@pytest.mark.django_db
def test_update_course_command_admin(admin_client, admin_draft_course):
    data = json.dumps({"type": CommandTypes.UPDATE_COURSE, "steps": []})
    response = admin_client.put(
        reverse(
            "api:v1:course-command", kwargs={"course_uuid": admin_draft_course.uuid}
        ),
        data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED


# Test ENROLL_FOR_COURSE command
@pytest.mark.django_db
def test_enroll_for_course_command_student(
    student, student_client, admin_published_course
):
    command_data = {
        "type": CommandTypes.ENROLL_FOR_COURSE,
        "user_uuid": str(student.uuid),
    }
    response = student_client.put(
        reverse(
            "api:v1:course-command", kwargs={"course_uuid": admin_published_course.uuid}
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED


@pytest.mark.django_db
def test_enroll_for_course_command_teacher(
    teacher, teacher_client, admin_published_course
):
    command_data = {
        "type": CommandTypes.ENROLL_FOR_COURSE,
        "user_uuid": str(teacher.uuid),
    }
    response = teacher_client.put(
        reverse(
            "api:v1:course-command", kwargs={"course_uuid": admin_published_course.uuid}
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED


@pytest.mark.django_db
def test_enroll_for_course_command_admin(admin, admin_client, admin_published_course):
    command_data = {
        "type": CommandTypes.ENROLL_FOR_COURSE,
        "user_uuid": str(admin.uuid),
    }
    response = admin_client.put(
        reverse(
            "api:v1:course-command", kwargs={"course_uuid": admin_published_course.uuid}
        ),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED


# Test COMPLETE_COURSE_STEP command
@pytest.mark.django_db
def test_complete_course_step_command_student(student_client, course_with_steps):
    course, _ = course_with_steps

    course_detail_response = student_client.get(
        reverse("api:v1:course-detail", kwargs={"course_uuid": course.uuid})
    )
    assert course_detail_response.status_code == status.HTTP_200_OK
    course_data = course_detail_response.json()
    progress_tracking_uuid = course_data["steps"][0]["user_progress"]["tracking_uuid"]

    # Complete course step
    command_data = {
        "type": CommandTypes.COMPLETE_COURSE_STEP,
        "progress_tracking_uuid": progress_tracking_uuid,
    }
    response = student_client.put(
        reverse("api:v1:course-command", kwargs={"course_uuid": course.uuid}),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED


@pytest.mark.django_db
def test_complete_course_step_command_teacher(teacher_client, course_with_steps):
    course, _ = course_with_steps

    course_detail_response = teacher_client.get(
        reverse("api:v1:course-detail", kwargs={"course_uuid": course.uuid})
    )
    assert course_detail_response.status_code == status.HTTP_200_OK
    course_data = course_detail_response.json()
    progress_tracking_uuid = course_data["steps"][0]["user_progress"]["tracking_uuid"]

    # Complete course step
    command_data = {
        "type": CommandTypes.COMPLETE_COURSE_STEP,
        "progress_tracking_uuid": progress_tracking_uuid,
    }
    response = teacher_client.put(
        reverse("api:v1:course-command", kwargs={"course_uuid": course.uuid}),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED


@pytest.mark.django_db
def test_complete_course_step_command_admin(admin_client, course_with_steps):
    course, _ = course_with_steps

    course_detail_response = admin_client.get(
        reverse("api:v1:course-detail", kwargs={"course_uuid": course.uuid})
    )
    assert course_detail_response.status_code == status.HTTP_200_OK
    course_data = course_detail_response.json()
    progress_tracking_uuid = course_data["steps"][0]["user_progress"]["tracking_uuid"]

    # Complete course step
    command_data = {
        "type": CommandTypes.COMPLETE_COURSE_STEP,
        "progress_tracking_uuid": progress_tracking_uuid,
    }
    response = admin_client.put(
        reverse("api:v1:course-command", kwargs={"course_uuid": course.uuid}),
        command_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_202_ACCEPTED


# Test CREATE_COURSE command
@pytest.mark.django_db
def test_create_course_command_student(student_client):
    command_data = {
        "type": CommandTypes.CREATE_COURSE,
        "title": "Sample Course Title",
        "description": "Sample Course Description",
    }

    response = student_client.put(
        reverse("api:v1:course"), command_data, content_type="application/json"
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_create_course_command_teacher(teacher_client):
    command_data = {
        "type": CommandTypes.CREATE_COURSE,
        "title": "Sample Course Title",
        "description": "Sample Course Description",
    }

    response = teacher_client.put(
        reverse("api:v1:course"), command_data, content_type="application/json"
    )
    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_create_course_command_admin(admin_client):
    command_data = {
        "type": CommandTypes.CREATE_COURSE,
        "title": "Sample Course Title",
        "description": "Sample Course Description",
    }

    response = admin_client.put(
        reverse("api:v1:course"), command_data, content_type="application/json"
    )
    assert response.status_code == status.HTTP_201_CREATED
