from .mixin import CourseStepBaseModel, TimestampedModel
from .resources import FileResource
from django.db import models
from django.conf import settings


class FileEvaluationType(CourseStepBaseModel):
    def __str__(self) -> str:
        return self.title  # pragma: no cover


class EvaluationAttempt(TimestampedModel):
    file = models.ForeignKey(FileResource, on_delete=models.PROTECT)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_passed = models.BooleanField(default=False)
