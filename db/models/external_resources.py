from django.db import models

from .mixin import TimestampedModel


class ExternalResourceType(models.TextChoices):
    FILE = "FILE", "File"
    URL = "URL", "URL"


class ExternalResource(TimestampedModel):
    title = models.CharField(max_length=50)
    url = models.URLField(null=True, blank=True)
    file = models.FileField(upload_to="uploads/")

    type = models.CharField(
        max_length=50,
        choices=ExternalResourceType.choices,
        default=ExternalResourceType.FILE,
    )

    def __str__(self) -> str:
        return self.title  # pragma: no cover
