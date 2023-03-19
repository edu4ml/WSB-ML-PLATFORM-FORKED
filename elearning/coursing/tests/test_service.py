import pytest
from mock import Mock

from elearning.configuration import Configuration
from elearning.coursing.commands import CreateCourse
from elearning.coursing.course import Course


@pytest.fixture
def app():
    mock_repository = Mock()
    config = Configuration(repository=mock_repository)
    config.configure()
    return config


def test_course_create_command(app: Configuration):
    course_title = "test course title"
    course_description = "test description"

    command = CreateCourse(title=course_title, description=course_description)

    app.command_bus.issue(command)

    app.repository.course.persist.assert_called_with(
        Course(
            title=course_title, description=course_description, is_draft=True, id=None
        )
    )
