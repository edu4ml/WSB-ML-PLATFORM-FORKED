from .course import CourseRepository
from .user import UserRepository


class RepositoryRoot:
    def __init__(self) -> None:
        self.course: CourseRepository = CourseRepository()
        self.user: UserRepository = CourseRepository()
