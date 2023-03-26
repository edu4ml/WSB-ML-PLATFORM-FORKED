from .course import (
    CourseRepository,
    CourseEnrollmentRepositoryCRUD,
)
from .user import UserRepository, UserRepositoryCRUD


class RepositoryRoot:
    def __init__(self) -> None:
        class CRUD:
            def __init__(self) -> None:
                self.enrollment: CourseEnrollmentRepositoryCRUD = (
                    CourseEnrollmentRepositoryCRUD()
                )
                self.user: UserRepositoryCRUD = UserRepositoryCRUD()

        self.course: CourseRepository = CourseRepository()
        self.user: UserRepository = CourseRepository()

        self.crud: CRUD = CRUD()
