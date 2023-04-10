from typing import Any, Callable, Dict
from uuid import UUID, uuid4

import pytest
from django.test import Client
from django.urls import reverse
from model_bakery import baker
from rest_framework.response import Response
from db.models import (
    Course,
    CourseStep,
    Role,
    CourseComponent,
    Submission,
)
from db.models.courses import CourseStepUserProgress
from db.models.external_resources import ExternalResource
from elearning.auth.user import User
from shared.enums import CommandTypes, CourseStepEvaluationType, UserRoles
from django.core.files.uploadedfile import SimpleUploadedFile


CREDENTIALS = dict(
    admin=dict(username="test_admin", password="adminadmin", email="admin@example.com"),
    teacher=dict(
        username="test_teacher", password="adminadmin", email="teacher@example.com"
    ),
    teacher_2=dict(
        username="test_teacher_2", password="adminadmin", email="teacher_2@example.com"
    ),
    student=dict(
        username="test_student", password="adminadmin", email="student@example.com"
    ),
)


@pytest.fixture
def admin_role():
    return baker.make(Role, name=UserRoles.ADMIN)


@pytest.fixture
def teacher_role():
    return baker.make(Role, name=UserRoles.TEACHER)


@pytest.fixture
def student_role():
    return baker.make(Role, name=UserRoles.STUDENT)


@pytest.fixture
def admin(admin_role):
    user = User.objects.create_user(
        uuid=uuid4(),
        **CREDENTIALS["admin"],
    )
    user.roles.add(admin_role)
    return user


@pytest.fixture
def student(student_role):
    student = User.objects.create_user(
        uuid=uuid4(),
        **CREDENTIALS["student"],
    )
    student.roles.add(student_role)
    return student


@pytest.fixture
def teacher(teacher_role):
    teacher = User.objects.create_user(
        uuid=uuid4(),
        **CREDENTIALS["teacher"],
    )
    teacher.roles.add(teacher_role)
    return teacher


@pytest.fixture
def teacher_2(teacher_role):
    teacher = User.objects.create_user(
        uuid=uuid4(),
        **CREDENTIALS["teacher_2"],
    )
    teacher.roles.add(teacher_role)
    return teacher


@pytest.fixture
def client() -> Client:
    return Client(enforce_csrf_checks=False, HTTP_ACCEPT="application/json")


@pytest.fixture
def admin_client(admin) -> Client:
    client = Client(enforce_csrf_checks=False, HTTP_ACCEPT="application/json")
    response = client.post(
        reverse("api:v1:auth:rest_login"),
        dict(**CREDENTIALS["admin"]),
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def student_client(student) -> Client:
    client = Client(enforce_csrf_checks=False, HTTP_ACCEPT="application/json")
    response = client.post(
        reverse("api:v1:auth:rest_login"),
        dict(**CREDENTIALS["student"]),
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def teacher_client(teacher) -> Client:
    client = Client(enforce_csrf_checks=False, HTTP_ACCEPT="application/json")
    response = client.post(
        reverse("api:v1:auth:rest_login"),
        dict(**CREDENTIALS["teacher"]),
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def teacher_client_2(teacher_2) -> Client:
    client = Client(enforce_csrf_checks=False, HTTP_ACCEPT="application/json")
    response = client.post(
        reverse("api:v1:auth:rest_login"),
        dict(**CREDENTIALS["teacher_2"]),
    )
    assert response.status_code == 200
    return client


@pytest.fixture
def courses(teacher):
    return baker.make(Course, 4, is_draft=False, author=teacher)


@pytest.fixture
def admin_published_course(admin):
    return baker.make(Course, is_draft=False, author=admin)


@pytest.fixture
def admin_draft_course(admin):
    return baker.make(Course, is_draft=True, author=admin)


@pytest.fixture
def teacher_published_course(teacher):
    return baker.make(Course, is_draft=False, author=teacher)


@pytest.fixture
def teacher_draft_course(teacher):
    return baker.make(Course, is_draft=True, author=teacher)


@pytest.fixture
def other_teacher_draft_course():
    teacher = User.objects.create_user(
        uuid=uuid4(),
        username="otherTeacher",
        email="otherteacher@example.com",
        password="adminadmin",
    )
    teacher.roles.add(Role.objects.get_or_create(name=UserRoles.TEACHER)[0])
    return baker.make(Course, is_draft=True, author_id=teacher.uuid)


@pytest.fixture
def components(teacher):
    return baker.make(CourseComponent, 4, author=teacher)


@pytest.fixture
def component():
    return baker.make(CourseComponent)


@pytest.fixture
def course_with_steps(components, teacher):
    course = baker.make(Course, author=teacher)
    steps = []
    order = 1
    for component in components:
        steps.append(
            baker.make(
                CourseStep,
                course=course,
                component=component,
                order=order,
                make_m2m=True,
            )
        )
        order += 1
    return course, steps


@pytest.fixture
def external_resources():
    return baker.make(ExternalResource, 4)


@pytest.fixture
def submissions():
    return baker.make(Submission, 10)


@pytest.fixture
def submission(published_course, student):
    step_id = published_course["steps"][0]["uuid"]
    CourseStepUserProgress.objects.create(user=student, step_id=step_id)
    return baker.make(
        Submission, course_step_id=published_course["steps"][0]["uuid"], user=student
    )


@pytest.fixture
def tmp_uploaded_file():
    file_content = b"Dummy file content"
    uploaded_file = SimpleUploadedFile(
        "test_file.txt", file_content, content_type="text/plain"
    )
    return uploaded_file


@pytest.fixture
def create_course() -> Callable[[Client, str], Response]:
    def issue_command(client: Client, title: str = "Test course") -> Response:
        command = dict(type=CommandTypes.CREATE_COURSE, title=title)
        return client.post(reverse("api:v1:command-list"), data=command)

    return issue_command


@pytest.fixture
def update_course() -> Callable[[Client, UUID], Response]:
    def issue_command(client: Client, **kwargs: Dict[str, Any]) -> Response:
        command = dict(type=CommandTypes.UPDATE_COURSE, **kwargs)
        return client.post(
            reverse("api:v1:command-list"),
            content_type="application/json",
            data=command,
        )

    return issue_command


@pytest.fixture
def publish_course() -> Callable[[Client, UUID], Response]:
    def issue_command(client, **kwargs: Dict[str, Any]) -> Response:
        command = dict(type=CommandTypes.PUBLISH_COURSE, **kwargs)
        return client.post(
            reverse("api:v1:command-list"),
            content_type="application/json",
            data=command,
        )

    return issue_command


@pytest.fixture
def enroll_for_course() -> Callable[[Client, UUID, Dict[str, Any]], Response]:
    def issue_command(client: Client, **kwargs: Dict[str, Any]) -> Response:
        command = dict(type=CommandTypes.ENROLL_FOR_COURSE, **kwargs)
        return client.post(
            reverse("api:v1:command-list"),
            content_type="application/json",
            data=command,
        )

    return issue_command


@pytest.fixture
def create_component() -> Callable[[Client, str], Response]:
    def issue_command(client: Client, **kwargs) -> Response:
        command = dict(type=CommandTypes.CREATE_COMPONENT, **kwargs)
        return client.post(reverse("api:v1:command-list"), data=command)

    return issue_command


@pytest.fixture
def published_course(
    teacher_client,
    create_course,
    update_course,
    create_component,
    publish_course,
) -> Course:
    course = create_course(teacher_client).json()
    component_1 = create_component(
        teacher_client, title="Test component", description="Test description"
    ).json()
    course = update_course(
        teacher_client,
        course_uuid=course["uuid"],
        steps=[
            dict(
                component=component_1["uuid"],
                order=1,
                evaluation_type=CourseStepEvaluationType.SELF_EVALUATED.value,
            )
        ],
    ).json()
    return publish_course(teacher_client, course_uuid=course["uuid"]).json()
