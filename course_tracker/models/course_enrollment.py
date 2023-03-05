from django.db import models

from course_tracker.models.course import Course, User
from course_tracker.models.mixin import TimestampedModel


class CourseEnrollment(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.course.title} - {self.user.get_username()}"
