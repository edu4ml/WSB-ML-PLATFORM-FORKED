from infra.repository import MockedEntityRepository
from .course import CourseRepository


class RepositoryRoot:
    def __init__(self) -> None:
        self.course = CourseRepository()


class RepositoryRootMock(RepositoryRoot):
    def __init__(self) -> None:
        self.course = MockedEntityRepository()
