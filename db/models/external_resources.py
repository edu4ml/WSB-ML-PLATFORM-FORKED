from django.db import models

from .mixin import TimestampedModel


class ExternalResource(TimestampedModel):
    title = models.CharField(max_length=50)
    url = models.URLField()
    file = models.FileField(upload_to="uploads/")

    def __str__(self) -> str:
        return self.title  # pragma: no cover
