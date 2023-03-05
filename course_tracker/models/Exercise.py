from django.db import models
from django.urls import reverse

from course_tracker.models.mixin import TimestampedModel
from course_tracker.models.resource import Resource


class Exercise(TimestampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField()
    requires_file = models.BooleanField(default=False)
    requires_test = models.BooleanField(default=False)
    requires_manual_review = models.BooleanField(default=False)
    is_self_evaluated = models.BooleanField(default=False)

    resources = models.ManyToManyField(Resource, blank=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("exercise-detail", args=[str(self.id)])
