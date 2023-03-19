from uuid import UUID
from db.models import Exercise as ExerciseDbModel
from elearning.exercising.entities import LinkResource
from elearning.exercising.exercise import Exercise
from infra.logging import logger
from infra.repository import Repository


@logger
class ExerciseRepository(Repository):
    root_model = ExerciseDbModel

    def list(self):
        exercises = self.root_model.objects.all()
        return [self._prepare_domain_entity(e) for e in exercises]

    def retrieve(self, uuid: UUID):
        try:
            return self._prepare_domain_entity(self.root_model.objects.get(uuid=uuid))
        except self.root_model.DoesNotExist as e:
            self.logger.error(e)
        return None

    def _prepare_domain_entity(self, db_model: ExerciseDbModel):
        return Exercise(
            uuid=db_model.uuid,
            title=db_model.title,
            description=db_model.description,
            resources=[
                LinkResource(title=r.title, url=r.url) for r in db_model.resources.all()
            ],
        )
