from .course import (
    CourseRepository,
)
from .enrollment import CourseEnrollmentRepository
from .user import UserRepository


class RepositoryRoot:
    def __init__(self) -> None:
        self.course: CourseRepository = CourseRepository()
        self.user: UserRepository = UserRepository()
        self.enrollment = CourseEnrollmentRepository()
