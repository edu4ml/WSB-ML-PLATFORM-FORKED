from django.db import models

from course_tracker.models.mixin import TimestampedModel


class Resource(TimestampedModel):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self) -> str:
        return self.title
