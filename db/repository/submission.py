from infra.logging import logger
from infra.repository import ModelRepository
from db.models import Submission as SubmissionDbModel
from elearning.entities.submission import Submission


@logger
class SubmissionRepository(ModelRepository[SubmissionDbModel]):
    db_model = SubmissionDbModel
    domain_entity = Submission

    def from_model(self, obj):
        return self.domain_entity(
            uuid=obj.uuid,
            title=obj.title,
            description=obj.description,
            file_link=obj.file.url if obj.file else "",
            status=obj.status,
        )
