from django.db import models

from course_tracker.models.mixin import TimestampedModel


class Resource(TimestampedModel):
    url = models.URLField()
    description = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.description
