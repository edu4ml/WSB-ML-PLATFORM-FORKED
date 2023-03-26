import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
def test_list_courses_unauthorized(client, courses):
    response = client.get(reverse("api:v1:course"))
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_list_courses_admin(admin_client, courses):
    response = admin_client.get(reverse("api:v1:course"))
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_list_courses_student(student_client, courses):
    response = student_client.get(reverse("api:v1:course"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(courses)


@pytest.mark.django_db
def test_list_courses_teacher(teacher_client, courses):
    response = teacher_client.get(reverse("api:v1:course"))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == len(courses)


@pytest.mark.django_db
def test_course_detail_unauthorized(client, admin_published_course):
    response = client.get(
        reverse(
            "api:v1:course-detail", kwargs={"course_uuid": admin_published_course.uuid}
        )
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_course_detail_student(student_client, admin_published_course):
    response = student_client.get(
        reverse(
            "api:v1:course-detail", kwargs={"course_uuid": admin_published_course.uuid}
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(admin_published_course.uuid)


@pytest.mark.django_db
def test_course_detail_teacher(teacher_client, admin_published_course):
    response = teacher_client.get(
        reverse(
            "api:v1:course-detail", kwargs={"course_uuid": admin_published_course.uuid}
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(admin_published_course.uuid)


@pytest.mark.django_db
def test_course_detail_admin(admin_client, admin_published_course):
    response = admin_client.get(
        reverse(
            "api:v1:course-detail", kwargs={"course_uuid": admin_published_course.uuid}
        )
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["uuid"] == str(admin_published_course.uuid)
