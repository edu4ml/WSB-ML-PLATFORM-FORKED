from .course import (
    CourseRepository,
)
from .enrollment import CourseEnrollmentRepository
from .user import UserRepository, UserRepositoryCRUD


class RepositoryRoot:
    def __init__(self) -> None:
        class CRUD:
            def __init__(self) -> None:
                self.user: UserRepositoryCRUD = UserRepositoryCRUD()

        self.course: CourseRepository = CourseRepository()
        self.user: UserRepository = CourseRepository()
        self.enrollment = CourseEnrollmentRepository()

        self.crud: CRUD = CRUD()
