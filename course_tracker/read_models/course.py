from pydantic import BaseModel

from course_tracker.models import Course, CourseStep, User
from course_tracker.read_models.course_step import CourseStepReadModel


class CourseReadModel(BaseModel):
    id: int
    title: str
    description: str
    is_enrolled: bool
    is_completed: bool
    progress: int
    current_active: int
    steps: list[CourseStepReadModel]

    def __init__(self, course: Course, user: User, **kwargs) -> None:
        kwargs["id"] = course.id
        kwargs["title"] = course.title
        kwargs["description"] = course.description
        kwargs["is_enrolled"] = user.courseenrollment_set.filter(course=course).exists()
        kwargs["is_completed"] = self._calculate_is_completed(user)
        kwargs["steps"] = self._get_steps(course=course, user=user)
        kwargs["progress"] = self._calculate_progress(kwargs["steps"])
        kwargs["current_active"] = self._calculate_current_active(kwargs["steps"])
        super().__init__(**kwargs)

    def _calculate_is_completed(self, user: User) -> bool:
        return False

    def _calculate_progress(self, exercises: list[CourseStepReadModel]) -> float:
        return 1
        total_exercises = len(exercises)
        completed_exercises = len(
            list(filter(lambda exercise: exercise.is_completed, exercises))
        )
        if total_exercises == 0:
            return 0
        return int((completed_exercises / total_exercises) * 100)

    def _calculate_current_active(self, steps: list[CourseStepReadModel]) -> int:
        current_active = 0
        for step in steps:
            if step.is_blocked:
                return current_active
            current_active += 1
        return current_active

    def _get_steps(self, course: Course, user: User):
        return list(
            [
                CourseStepReadModel(
                    component=step.component,
                    step=step,
                    user=user,
                    course=course,
                )
                for step in CourseStep.objects.filter(course=course)
            ]
        )
