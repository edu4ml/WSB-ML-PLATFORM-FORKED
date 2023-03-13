from pydantic import BaseModel
from typing import NamedTuple
from course_tracker.models import Course, CourseStep, User
from course_tracker.domain.course_step import CourseStep


class Course(NamedTuple):
    # id: int
    title: str
    description: str = ""
    is_enrolled: bool = False
    is_completed: bool = False
    progress: int = 0
    current_active: int = 1
    steps: list[CourseStep] = []

    # def __init__(self, course: Course, user: User, **kwargs) -> None:
    #     self.id = course.id
    #     self.title = course.title
    #     self.description = course.description
    #     self.is_enrolled = user.courseenrollment_set.filter(course=course).exists()
    #     self.is_completed = self._calculate_is_completed(user)
    #     self.steps = self._get_steps(course=course, user=user)
    #     self.progress = self._calculate_progress(kwargs["steps"])
    #     self.current_active = self._calculate_current_active(kwargs["steps"])

    # def _calculate_is_completed(self, user: User) -> bool:
    #     return False

    # def _calculate_progress(self, exercises: list[CourseStep]) -> float:
    #     return 1
    #     total_exercises = len(exercises)
    #     completed_exercises = len(
    #         list(filter(lambda exercise: exercise.is_completed, exercises))
    #     )
    #     if total_exercises == 0:
    #         return 0
    #     return int((completed_exercises / total_exercises) * 100)

    # def _calculate_current_active(self, steps: list[CourseStep]) -> int:
    #     current_active = 0
    #     for step in steps:
    #         if step.is_blocked:
    #             return current_active
    #         current_active += 1
    #     return current_active

    # def _get_steps(self, course: Course, user: User):
    #     return list(
    #         [
    #             CourseStep(
    #                 component=step.component,
    #                 step=step,
    #                 user=user,
    #                 course=course,
    #             )
    #             for step in CourseStep.objects.filter(course=course)
    #         ]
    #     )
