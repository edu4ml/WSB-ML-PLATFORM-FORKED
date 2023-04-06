from django import forms
from db.models import (
    CourseStepUserProgress as CourseStepUserProgressDbModel,
)
from db.models.courses import Submission
from elearning.entities.user_progress import CourseStepUserProgress
from infra.exceptions import RequestException
from infra.logging import logger
from infra.repository import ModelRepository


class EvaluationAttemptForm(forms.ModelForm):
    class Meta:
        model = Submission
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
            is_blocked=obj.is_blocked,
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

    def create_user_progress_for_course(self, course, user):
        CourseStepUserProgressDbModel.objects.create(
            user_id=user.uuid, step_id=course.steps[0].uuid, is_blocked=False
        )

        for step in course.steps[1:]:
            CourseStepUserProgressDbModel.objects.create(
                user_id=user.uuid, step_id=step.uuid
            )

    def complete_step_for_user(self, step_uuid, user_uuid):
        progress = CourseStepUserProgressDbModel.objects.get(
            step__uuid=step_uuid, user__uuid=user_uuid
        )
        progress.is_completed = True
        progress.save()
        return progress

    def unlock_step_for_user(self, step_uuid, user_uuid):
        progress = CourseStepUserProgressDbModel.objects.get(
            step__uuid=step_uuid, user__uuid=user_uuid
        )
        progress.is_blocked = False
        progress.save()
        return progress
