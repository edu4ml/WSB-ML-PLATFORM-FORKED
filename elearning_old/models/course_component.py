from django.db import models

from course_tracker.models.mixin import TimestampedModel
from course_tracker.models.resource import Resource


STEP_TYPES = (
    ("TEST", "Test"),
    ("EXTERNAL_RESOURCE", "External Resource"),
    ("UNKNOWN", "Unknown step"),
)


class CourseComponent(TimestampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField()

    resources = models.ManyToManyField(Resource, blank=True)

    type = models.CharField(max_length=20, choices=STEP_TYPES, default="UNKNOWN")

    def __str__(self):
        return self.title
