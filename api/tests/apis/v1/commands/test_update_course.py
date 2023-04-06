import pytest
from rest_framework import status
from uuid import uuid4
from shared.enums import CourseStepEvaluationType


@pytest.mark.django_db
def test_admin_updates_draft_course_description_and_steps(
    admin_client,
    create_course,
    create_component,
    update_course,
):
    response = create_course(admin_client)
    course_uuid = response.json()["uuid"]

    component_1 = create_component(
        admin_client, title="Component 1", description="Component 1 description"
    ).json()
    component_2 = create_component(
        admin_client, title="Component 2", description="Component 2 description"
    ).json()

    update_payload = dict(
        description="New description",
        steps=[
            dict(
                order=1,
                component=component_1["uuid"],
                evaluation_type=CourseStepEvaluationType.FILE_EVALUATED.value,
            ),
            dict(
                order=2,
                component=component_2["uuid"],
                evaluation_type=CourseStepEvaluationType.SELF_EVALUATED.value,
            ),
        ],
    )

    response = update_course(
        client=admin_client, course_uuid=course_uuid, **update_payload
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response_json = response.json()
    assert response_json["description"] == update_payload["description"]
    for i, step in enumerate(update_payload["steps"]):
        assert response_json["steps"][i]["order"] == step["order"]
        assert response_json["steps"][i]["component"]["uuid"] == step["component"]
        assert response_json["steps"][i]["evaluation_type"] == step["evaluation_type"]


@pytest.mark.django_db
def test_teacher_updates_own_draft_course_description_and_steps(
    teacher_client, create_component, create_course, update_course
):

    response = create_course(teacher_client)
    course_uuid = response.json()["uuid"]

    component_1 = create_component(
        teacher_client, title="Component 1", description="Component 1 description"
    ).json()
    component_2 = create_component(
        teacher_client, title="Component 2", description="Component 2 description"
    ).json()

    update_payload = dict(
        description="New description",
        steps=[
            dict(
                order=1,
                component=component_1["uuid"],
                evaluation_type=CourseStepEvaluationType.FILE_EVALUATED.value,
            ),
            dict(
                order=2,
                component=component_2["uuid"],
                evaluation_type=CourseStepEvaluationType.SELF_EVALUATED.value,
            ),
        ],
    )

    response = update_course(
        client=teacher_client, course_uuid=course_uuid, **update_payload
    )
    assert response.status_code == status.HTTP_202_ACCEPTED

    response_json = response.json()
    assert response_json["description"] == update_payload["description"]
    for i, step in enumerate(update_payload["steps"]):
        assert response_json["steps"][i]["order"] == step["order"]
        assert response_json["steps"][i]["component"]["uuid"] == step["component"]
        assert response_json["steps"][i]["evaluation_type"] == step["evaluation_type"]


@pytest.mark.django_db
def test_teacher_cannot_update_draft_course_not_created_by_them(
    teacher_client,
    teacher_client_2,
    create_component,
    create_course,
    update_course,
):

    response = create_course(teacher_client)
    course_uuid = response.json()["uuid"]

    component_1 = create_component(
        teacher_client, title="Component 1", description="Component 1 description"
    ).json()
    component_2 = create_component(
        teacher_client, title="Component 2", description="Component 2 description"
    ).json()

    update_payload = dict(
        description="New description",
        steps=[
            dict(
                order=1,
                component=component_1["uuid"],
                evaluation_type=CourseStepEvaluationType.FILE_EVALUATED.value,
            ),
            dict(
                order=2,
                component=component_2["uuid"],
                evaluation_type=CourseStepEvaluationType.SELF_EVALUATED.value,
            ),
        ],
    )

    response = update_course(
        client=teacher_client_2, course_uuid=course_uuid, **update_payload
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json()["message"] == "Only author can update the course"


@pytest.mark.django_db
def test_student_cannot_update_draft_course(
    student_client, teacher_client, create_course, update_course
):
    response = create_course(teacher_client).json()
    response = update_course(
        student_client,
        response["uuid"],
        **dict(
            description="New description",
            steps=[],
        )
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_admin_cannot_update_published_course(
    admin_client, create_course, publish_course, update_course
):
    response = create_course(admin_client).json()
    response = publish_course(admin_client, course_uuid=response["uuid"]).json()
    response = update_course(
        admin_client,
        response["uuid"],
        **dict(
            description="New description",
            steps=[],
        )
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json()["message"] == "Cannot update already published course"


@pytest.mark.django_db
def test_update_non_existent_course(teacher_client, update_course):
    response = update_course(
        teacher_client,
        str(uuid4()),
        **dict(
            description="New description",
            steps=[],
        )
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["message"] == "Course does not exists"


@pytest.mark.django_db
def test_update_course_with_invalid_data_missing_evaluation_type(
    teacher_client, create_course, update_course, create_component
):

    component_1 = create_component(
        teacher_client, title="Component 1", description="Component 1 description"
    ).json()

    response = create_course(teacher_client).json()
    response = update_course(
        teacher_client,
        str(uuid4()),
        **dict(
            description="New description",
            steps=[
                dict(
                    order=1,
                    component=component_1["uuid"],
                ),
            ],
        )
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["message"] == "Missing evaluation type"


@pytest.mark.django_db
def test_update_course_with_invalid_data_missing_order(
    teacher_client, create_component, update_course, create_course
):

    component_1 = create_component(
        teacher_client, title="Component 1", description="Component 1 description"
    ).json()

    response = create_course(teacher_client).json()
    response = update_course(
        teacher_client,
        str(uuid4()),
        **dict(
            description="New description",
            steps=[
                dict(
                    component=component_1["uuid"],
                    evaluation_type=CourseStepEvaluationType.FILE_EVALUATED,
                ),
            ],
        )
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["message"] == "Missing order"


@pytest.mark.django_db
def test_update_course_with_invalid_data_missing_component(
    teacher_client, create_course, update_course
):

    response = create_course(teacher_client).json()
    response = update_course(
        teacher_client,
        str(uuid4()),
        **dict(
            description="New description",
            steps=[
                dict(
                    order=1,
                    evaluation_type=CourseStepEvaluationType.FILE_EVALUATED,
                ),
            ],
        )
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["message"] == "Missing component uuid"


@pytest.mark.django_db
def test_update_course_without_authentication(
    client, teacher_client, create_course, update_course
):

    response = create_course(teacher_client).json()
    response = update_course(
        client,
        response["uuid"],
        **dict(
            description="New description",
            steps=[],
        )
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
