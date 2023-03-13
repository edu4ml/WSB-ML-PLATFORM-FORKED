from .mixin import TimestampedModel

from django.db import models


class Course(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_draft = models.BooleanField(default=True)
