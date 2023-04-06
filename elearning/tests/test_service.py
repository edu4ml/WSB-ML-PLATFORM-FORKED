import pytest
from mock import Mock

from elearning.configuration import Configuration


@pytest.fixture
def app():
    mock_repository = Mock()
    config = Configuration(repository=mock_repository)
    config.configure()
    return config
