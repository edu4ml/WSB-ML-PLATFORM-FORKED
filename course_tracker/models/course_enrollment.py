from django.contrib.auth import get_user_model
from django.db import models

from course_tracker.models.course import Course
from course_tracker.models.mixin import TimestampedModel


User = get_user_model()


class CourseEnrollment(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
