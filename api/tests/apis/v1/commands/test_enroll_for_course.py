from uuid import uuid4
import pytest
from django.urls import reverse
from rest_framework import status


def _assert_is_enrolled(client, course_uuid):
    course = client.get(
        reverse("api:v1:course-detail", kwargs=dict(course_uuid=course_uuid))
    ).json()
    assert course["is_enrolled"]


@pytest.mark.django_db
def test_student_can_enroll_himself(
    student, student_client, enroll_for_course, published_course
):
    response = enroll_for_course(
        student_client, course_uuid=published_course["uuid"], user_uuid=student.uuid
    )
    assert response.status_code == status.HTTP_202_ACCEPTED
    _assert_is_enrolled(student_client, published_course["uuid"])


@pytest.mark.django_db
def test_teacher_can_enroll_himself(
    teacher, teacher_client, enroll_for_course, published_course
):
    response = enroll_for_course(
        teacher_client, course_uuid=published_course["uuid"], user_uuid=teacher.uuid
    )
    assert response.status_code == status.HTTP_202_ACCEPTED
    _assert_is_enrolled(teacher_client, published_course["uuid"])


@pytest.mark.django_db
def test_teacher_can_enroll_student(
    teacher,
    student,
    teacher_client,
    student_client,
    enroll_for_course,
    published_course,
):
    response = enroll_for_course(
        teacher_client, course_uuid=published_course["uuid"], user_uuid=student.uuid
    )
    assert response.status_code == status.HTTP_202_ACCEPTED
    _assert_is_enrolled(student_client, published_course["uuid"])


@pytest.mark.django_db
def test_teacher_can_enroll_in_unpublished_course(
    teacher, teacher_client, enroll_for_course, create_course
):
    course = create_course(teacher_client).json()
    response = enroll_for_course(
        teacher_client, course_uuid=course["uuid"], user_uuid=teacher.uuid
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["message"] == "Cannot enroll in unpublished course"


@pytest.mark.django_db
def test_cannot_enroll_twice(
    teacher, teacher_client, enroll_for_course, published_course
):
    response = enroll_for_course(
        teacher_client, course_uuid=published_course["uuid"], user_uuid=teacher.uuid
    )
    assert response.status_code == status.HTTP_202_ACCEPTED
    _assert_is_enrolled(teacher_client, published_course["uuid"])
    response = enroll_for_course(
        teacher_client, course_uuid=published_course["uuid"], user_uuid=teacher.uuid
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["message"] == "User is already enrolled in course"


@pytest.mark.django_db
def test_enroll_in_non_existent_course(teacher_client, enroll_for_course, teacher):
    response = enroll_for_course(
        teacher_client, course_uuid=uuid4(), user_uuid=teacher.uuid
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["message"] == "Course not found"


@pytest.mark.django_db
def test_enroll_without_authentication(
    client, student, enroll_for_course, published_course
):

    response = enroll_for_course(
        client, course_uuid=published_course["uuid"], user_uuid=student.uuid
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_enroll_with_invalid_user_uuid(
    teacher_client, enroll_for_course, published_course
):
    response = enroll_for_course(
        teacher_client, course_uuid=published_course["uuid"], user_uuid=uuid4()
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["message"] == "User not found"
