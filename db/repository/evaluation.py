from db.models import FileEvaluationType as FileEvaluationTypeDbModel
from elearning.coursing.entities import Evaluation
from infra.logging import logger
from infra.repository import Repository


@logger
class EvaluationRepository(Repository):
    root_model = FileEvaluationTypeDbModel

    def list(self):
        evaluations = self.root_model.objects.all()
        return [self._prepare_domain_entity(e) for e in evaluations]

    def _prepare_domain_entity(self, db_model: FileEvaluationTypeDbModel):
        return Evaluation(
            id=db_model.id, title=db_model.title, description=db_model.description
        )
