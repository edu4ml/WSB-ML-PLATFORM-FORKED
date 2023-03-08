from enum import Enum

from pydantic import BaseModel

from course_tracker.models import CourseComponent, CourseComponentCompletion, User


class ExerciseRequiredEvaluationType(Enum):
    MANUAL = "MANUAL"
    TEST = "TEST"
    FILE = "FILE"


class ExerciseRequiredEvaluation(BaseModel):
    type: str
    passed: bool

    def __init__(
        self,
        type: ExerciseRequiredEvaluationType,
        user: User,
        exercise: CourseComponent,
        **kwargs
    ):
        kwargs["type"] = type.name
        kwargs["passed"] = self._calculate_is_passed(
            type=type, user=user, exercise=exercise
        )

        super().__init__(**kwargs)

    def _calculate_is_passed(
        self,
        type: ExerciseRequiredEvaluationType,
        user: User,
        exercise: CourseComponent,
    ) -> bool:
        exercise_completion, _ = CourseComponentCompletion.objects.get_or_create(
            user=user, exercise=exercise
        )

        if type == ExerciseRequiredEvaluationType.MANUAL:
            return exercise_completion.is_reviewed
        elif type == ExerciseRequiredEvaluationType.TEST:
            return exercise_completion.is_test_passed
        elif type == ExerciseRequiredEvaluationType.FILE:
            return exercise_completion.is_file_passed
