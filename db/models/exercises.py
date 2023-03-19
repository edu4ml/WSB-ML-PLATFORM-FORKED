from django.db import models

from .mixin import CourseStepBaseModel, TimestampedModel
from .resources import LinkResource


class Exercise(CourseStepBaseModel):
    resources = models.ManyToManyField(LinkResource, blank=True)

    def __str__(self) -> str:
        return self.title  # pragma: no cover
