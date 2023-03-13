from .mixin import TimestampedModel

from django.db import models
from django.conf import settings


class Course(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_draft = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title


class CourseEnrollment(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.course.title} - {self.user.get_username()}"
