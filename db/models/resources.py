from django.db import models

from .mixin import TimestampedModel


class LinkResource(TimestampedModel):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self) -> str:
        return self.title  # pragma: no cover


class FileResource(TimestampedModel):
    title = models.CharField(max_length=50)
    file = models.FileField(upload_to="uploads/")
