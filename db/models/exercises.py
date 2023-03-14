from .mixin import TimestampedModel
from django.db import models


class Exercise(TimestampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self) -> str:
        return self.title
