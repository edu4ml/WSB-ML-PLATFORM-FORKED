import pytest
from rest_framework import status
from django.urls import reverse


@pytest.mark.django_db
def test_admin_publish_course(admin_client, admin, create_course, publish_course):
    course_title = "New Course"
    response = create_course(admin_client, course_title)
    course = response.json()
    course_uuid = course["uuid"]

    response = publish_course(admin_client, course_uuid=course_uuid)
    assert response.status_code == status.HTTP_202_ACCEPTED
    published_course = response.json()
    assert published_course["is_draft"] is False


@pytest.mark.django_db
def test_teacher_publish_course(teacher_client, teacher, create_course, publish_course):
    course_title = "New Course"
    response = create_course(teacher_client, course_title)
    course = response.json()
    course_uuid = course["uuid"]

    response = publish_course(teacher_client, course_uuid=course_uuid)
    assert response.status_code == status.HTTP_202_ACCEPTED
    published_course = response.json()
    assert published_course["is_draft"] is False


@pytest.mark.django_db
def test_student_cannot_publish_course(
    teacher_client, student_client, create_course, publish_course
):
    course_title = "New Course"
    response = create_course(teacher_client, course_title)
    course = response.json()
    course_uuid = course["uuid"]

    response = publish_course(student_client, course_uuid=course_uuid)
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_unauthenticated_cannot_publish_course(
    client, teacher_client, create_course, publish_course
):
    course_title = "New Course"
    response = create_course(teacher_client, course_title)
    course = response.json()
    course_uuid = course["uuid"]

    response = publish_course(client, course_uuid=course_uuid)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_only_author_can_publish_course(
    teacher_client, teacher_client_2, create_course, publish_course
):
    course_title = "New Course"
    response = create_course(teacher_client, title=course_title)
    course = response.json()
    course_uuid = course["uuid"]

    # Attempt to publish the course using a different teacher's client (teacher_client_2)
    response = publish_course(teacher_client_2, course_uuid=course_uuid)
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.json()

    # Verify that the course is still in draft mode
    response = teacher_client.get(reverse("api:v1:course-detail", args=[course_uuid]))
    course_data = response.json()
    assert course_data["is_draft"] is True

    # Attempt to publish the course using the original author's client (teacher_client)
    response = publish_course(teacher_client, course_uuid=course_uuid)
    assert response.status_code == status.HTTP_202_ACCEPTED
    published_course = response.json()
    assert published_course["is_draft"] is False
