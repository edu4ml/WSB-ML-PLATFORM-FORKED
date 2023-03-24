from db.models import Evaluation as EvaluationTypeDbModel
from elearning.coursing.entities import Evaluation
from infra.logging import logger
from infra.repository import Repository


@logger
class EvaluationRepository(Repository):
    root_model = EvaluationTypeDbModel

    def list(self):
        evaluations = self.root_model.objects.all()
        return [self._prepare_domain_entity(e) for e in evaluations]

    def _prepare_domain_entity(self, db_model: EvaluationTypeDbModel):
        return Evaluation(
            uuid=db_model.uuid, title=db_model.title, description=db_model.description
        )
