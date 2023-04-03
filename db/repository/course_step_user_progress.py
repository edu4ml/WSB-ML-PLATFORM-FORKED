from django import forms
from db.models import (
    CourseStepUserProgress as CourseStepUserProgressDbModel,
)
from db.models.courses import EvaluationAttempt
from elearning.coursing.entities.user_progress import CourseStepUserProgress
from infra.exceptions import RequestException
from infra.logging import logger
from infra.repository import ModelRepository


class EvaluationAttemptForm(forms.ModelForm):
    class Meta:
        model = EvaluationAttempt
        fields = ("user", "title", "description", "file", "course_step")


@logger
class CourseStepUserProgressRepository(ModelRepository[CourseStepUserProgressDbModel]):
    db_model = CourseStepUserProgressDbModel

    def from_model(self, obj):
        return CourseStepUserProgress(
            tracking_uuid=obj.uuid,
            submissions=[],
            completed_at=obj.completed_at,
            is_completed=obj.is_completed,
        )

    def add_submission(self, request, user_progress_uuid):

        form_payload = request.POST.copy()
        form_payload["user"] = request.user
        form_payload["course_step"] = self.db_model.objects.get(
            uuid=user_progress_uuid
        ).step

        form = EvaluationAttemptForm(form_payload, request.FILES)

        if form.is_valid():
            form.save()
            return self.get_by_uuid(user_progress_uuid)

        else:
            raise RequestException(form.errors, status_code=400)
