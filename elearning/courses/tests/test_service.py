import pytest
from elearning.configuration import Configuration
from elearning.courses.commands import CreateCourse
from db.repository import RepositoryRootMock


@pytest.fixture
def app():
    mock_repository = RepositoryRootMock()
    config = Configuration(repository=mock_repository)
    config.configure()
    return config


def test_course_create_flow(app: Configuration):
    command = CreateCourse(title="test course title", description="test description")

    app.command_bus.issue(command)

    print("user gets a response")
