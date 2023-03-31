from db.models import (
    CourseStepUserProgress as CourseStepUserProgressDbModel,
)
from infra.logging import logger
from infra.repository import ModelRepository


@logger
class CourseStepUserProgressRepository(ModelRepository[CourseStepUserProgressDbModel]):
    root_model = CourseStepUserProgressDbModel

    def from_model(self, obj):
        pass
