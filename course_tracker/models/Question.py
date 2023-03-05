from django.db import models

from course_tracker.models.mixin import TimestampedModel


class Question(TimestampedModel):
    text = models.TextField()
    points = models.PositiveIntegerField(default=1)
