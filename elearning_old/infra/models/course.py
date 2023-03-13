from django.contrib.auth import get_user_model
from django.db import models

from course_tracker.models.mixin import TimestampedModel


User = get_user_model()


class Course(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    students = models.ManyToManyField(User, through="CourseEnrollment")

    def __str__(self):
        return self.title
