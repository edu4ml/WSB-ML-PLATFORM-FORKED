import uuid

from django.contrib.contenttypes.models import ContentType
from django.db import models


class UUIDModel(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class TimestampedModel(UUIDModel):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CourseStepBaseModel(TimestampedModel):
    """
    To keep field consistency across exercises, tests etc.
    All the courses steps
    """

    title = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        abstract = True

    @property
    def content_type(self):
        return ContentType.objects.get_for_model(self)
