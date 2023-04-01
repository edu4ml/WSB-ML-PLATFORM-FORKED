from db.repository.course_step_user_progress import CourseStepUserProgressRepository
from .course import (
    CourseRepository,
)
from .course_enrollment import CourseEnrollmentRepo
from .user import UserRepository


class RepositoryRoot:
    def __init__(self) -> None:
        self.course: CourseRepository = CourseRepository()
        self.course_step_user_progress: CourseStepUserProgressRepository = (
            CourseStepUserProgressRepository()
        )
        self.user: UserRepository = UserRepository()
        self.enrollment = CourseEnrollmentRepo()
