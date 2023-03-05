from pydantic import BaseModel

from course_tracker.models import Exercise, Resource, User
from course_tracker.models.exercise_completion import ExerciseCompletion
from course_tracker.read_models import ResourceReadModel
from course_tracker.read_models.exercise_required_evaluation import ExerciseRequiredEvaluation


class ExerciseReadModel(BaseModel):
    id: int
    title: str
    description: str
    resources: list[ResourceReadModel]
    is_completed: bool
    order: int
    requirements: list[ExerciseRequiredEvaluation]

    def __init__(self, exercise: Exercise, user: User, order: int, **kwargs) -> None:
        kwargs["id"] = exercise.id
        kwargs["title"] = exercise.title
        kwargs["description"] = exercise.description
        kwargs["resources"] = self._get_resources(exercise=exercise)
        kwargs["is_completed"] = ExerciseCompletion.objects.filter(
            exercise=exercise, user=user
        ).exists()
        kwargs["order"] = order
        kwargs["requirements"] = self._build_requirements(exercise)
        super().__init__(**kwargs)

    def _get_resources(self, exercise: Exercise):
        return [
            ResourceReadModel(resource)
            for resource in Resource.objects.filter(exercise=exercise)
        ]


    def _build_requirements(self, exercise: Exercise):
        requirements = []
        if exercise.requires_file:
            requirements.append(ExerciseRequiredEvaluation("FILE"))
        if exercise.requires_test:
            requirements.append(ExerciseRequiredEvaluation('TEST'))
        if exercise.requires_manual_review:
            requirements.append(ExerciseRequiredEvaluation('MANUAL'))
        return requirements