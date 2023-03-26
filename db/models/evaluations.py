from django.conf import settings
from django.db import models
from db.models.courses import CourseStep

from shared.enums import CourseStepEvaluationStatus

from .mixin import TimestampedModel
from .external_resources import ExternalResource


class EvaluationAttempt(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()

    course_step = models.ForeignKey(
        CourseStep,
        null=True,
        on_delete=models.PROTECT,
        default=None,
        related_name="evaluation_attempts",
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.ForeignKey(
        ExternalResource, on_delete=models.PROTECT, null=True, blank=True
    )

    status = models.CharField(
        max_length=40,
        choices=CourseStepEvaluationStatus.choices(),
        default=CourseStepEvaluationStatus.UNKNOWN,
    )

    def __str__(self) -> str:
        return f"{self.course_step} | {self.user}  | {self.status}"
