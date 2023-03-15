from .mixin import TimestampedModel
from django.db import models


class LinkResource(TimestampedModel):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self) -> str:
        return self.title


class Exercise(TimestampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField()
    resources = models.ManyToManyField(LinkResource, blank=True)

    def __str__(self) -> str:
        return self.title
