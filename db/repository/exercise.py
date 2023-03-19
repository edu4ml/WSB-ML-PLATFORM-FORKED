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

    def retrieve(self, id):
        try:
            return self._prepare_domain_entity(self.root_model.objects.get(id=id))
        except self.root_model.DoesNotExist as e:
            self.logger.error(e)
        return None

    def _prepare_domain_entity(self, db_model: ExerciseDbModel):
        return Exercise(
            id=db_model.id,
            title=db_model.title,
            description=db_model.description,
            resources=[
                LinkResource(title=r.title, url=r.url) for r in db_model.resources.all()
            ],
        )
