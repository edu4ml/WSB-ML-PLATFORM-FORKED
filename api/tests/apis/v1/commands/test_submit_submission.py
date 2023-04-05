from django.urls import reverse
import pytest

from shared.enums import CommandTypes


@pytest.mark.django_db
def test_admin_submit_submission(admin_client, tmp_uploaded_file, course_with_steps):

    course, steps = course_with_steps

    title = "Test Submission Title"
    description = "Test Submission Description"

    command_data = dict(
        type=CommandTypes.SUBMIT_SUBMISSION,
        course_step=steps[0].uuid,
        title=title,
        description=description,
    )
    response = admin_client.post(
        reverse(
            "api:v1:submission",
        ),
        {"file": tmp_uploaded_file, **command_data},
    )

    assert response.status_code == 202
    submission = response.json()
    assert submission["title"] == title
    assert submission["description"] == description
