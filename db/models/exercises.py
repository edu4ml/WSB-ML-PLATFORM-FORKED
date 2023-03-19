from .mixin import CourseStepBaseModel, TimestampedModel
from .resources import LinkResource
from django.db import models


class Exercise(CourseStepBaseModel):
    resources = models.ManyToManyField(LinkResource, blank=True)

    def __str__(self) -> str:
        return self.title  # pragma: no cover
