from pydantic import BaseModel

from course_tracker.models import (
    Course,
    CourseExercise,
    Exercise,
    ExerciseCompletion,
    Resource,
    User,
)
from course_tracker.read_models import ResourceReadModel
from course_tracker.read_models.exercise_required_evaluation import (
    ExerciseRequiredEvaluation,
    ExerciseRequiredEvaluationType,
)


class ExerciseReadModel(BaseModel):
    id: int
    is_completed: bool = False
    is_self_evaluated: bool = False
    is_blocked: bool = True
    order: int
    title: str
    description: str
    resources: list[ResourceReadModel]
    requirements: list[ExerciseRequiredEvaluation]

    def __init__(
        self, exercise: Exercise, user: User, order: int, course: Course, **kwargs
    ) -> None:
        exercise_completion, _ = ExerciseCompletion.objects.get_or_create(
            exercise=exercise, user=user
        )

        kwargs["id"] = exercise.id
        kwargs["title"] = exercise.title
        kwargs["description"] = exercise.description
        kwargs["resources"] = self._get_resources(exercise=exercise)
        kwargs["is_completed"] = exercise_completion.is_completed
        kwargs["order"] = order
        kwargs["is_self_evaluated"] = exercise.is_self_evaluated
        kwargs["requirements"] = self._build_requirements(user, exercise)
        kwargs["is_blocked"] = self._calculate_is_blocked(
            order=order, course=course, user=user
        )
        super().__init__(**kwargs)

    def _calculate_is_blocked(self, order: int, course: Course, user: User):
        if order == 1:
            return False
        else:
            # If previous exercise in course is blocked, mark this as blocked. Otherwise available
            previous_exericse = CourseExercise.objects.get(
                order=order - 1, course=course
            )
            return not ExerciseCompletion.objects.get(
                exercise=previous_exericse.exercise, user=user
            ).is_completed

    def _get_resources(self, exercise: Exercise):
        return [
            ResourceReadModel(resource)
            for resource in Resource.objects.filter(exercise=exercise)
        ]

    def _build_requirements(self, user: User, exercise: Exercise):
        requirements = []
        if exercise.requires_file:
            requirements.append(
                ExerciseRequiredEvaluation(
                    ExerciseRequiredEvaluationType.FILE, user=user, exercise=exercise
                )
            )
        if exercise.requires_test:
            requirements.append(
                ExerciseRequiredEvaluation(
                    ExerciseRequiredEvaluationType.TEST, user=user, exercise=exercise
                )
            )
        if exercise.requires_manual_review:
            requirements.append(
                ExerciseRequiredEvaluation(
                    ExerciseRequiredEvaluationType.MANUAL, user=user, exercise=exercise
                )
            )
        return requirements
