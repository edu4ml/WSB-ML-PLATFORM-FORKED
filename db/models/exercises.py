from .mixin import CourseStepBaseModel, TimestampedModel
from django.db import models


class LinkResource(TimestampedModel):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self) -> str:
        return self.title  # pragma: no cover


class Exercise(CourseStepBaseModel):
    resources = models.ManyToManyField(LinkResource, blank=True)

    def __str__(self) -> str:
        return self.title  # pragma: no cover
