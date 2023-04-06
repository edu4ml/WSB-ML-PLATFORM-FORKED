from db.models.courses import CourseStep
from infra.exceptions import RequestException
from infra.logging import logger
from infra.repository import ModelRepository
from db.models import Submission as SubmissionDbModel
from elearning.entities.submission import Submission
from django import forms

from shared.enums import CourseStepEvaluationStatus


class EvaluationAttemptForm(forms.ModelForm):
    class Meta:
        model = SubmissionDbModel
        fields = ("user", "title", "description", "file", "course_step")


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

    def create(self, file, user, title, description, course_step_uuid):
        course_step = CourseStep.objects.get(uuid=course_step_uuid)
        form = EvaluationAttemptForm(
            dict(
                user=user,
                title=title,
                description=description,
                course_step=course_step,
            ),
            file,
        )

        if form.is_valid():
            obj = form.save()
            return self.from_model(obj)

        else:
            raise RequestException(form.errors, status_code=400)

    def approve(self, uuid):
        submission = SubmissionDbModel.objects.get(uuid=uuid)
        submission.status = CourseStepEvaluationStatus.PASSED
        submission.save()
        return submission

    def reject(self, uuid):
        submission = SubmissionDbModel.objects.get(uuid=uuid)
        submission.status = CourseStepEvaluationStatus.FAILED
        submission.save()
        return submission
