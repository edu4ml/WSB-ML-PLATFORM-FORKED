from db.repository.component import ComponentRepo
from db.repository.course_step_user_progress import CourseStepUserProgressRepository
from db.repository.submission import SubmissionRepository
from .course import (
    CourseRepository,
)
from .course_enrollment import CourseEnrollmentRepository
from .user import UserRepository


class RepositoryRoot:
    enrollment: CourseEnrollmentRepository
    course: CourseRepository

    def __init__(self) -> None:
        self.course: CourseRepository = CourseRepository()
        self.course_step_user_progress: CourseStepUserProgressRepository = (
            CourseStepUserProgressRepository()
        )
        self.user: UserRepository = UserRepository()
        self.enrollment: CourseEnrollmentRepository = CourseEnrollmentRepository()
        self.submission: SubmissionRepository = SubmissionRepository()
        self.component: ComponentRepo = ComponentRepo()
