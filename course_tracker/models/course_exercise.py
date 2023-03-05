from django.db import models

from course_tracker.models import Course, Exercise, TimestampedModel


class CourseExercise(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    class Meta:
        unique_together = (("course", "exercise"), ("course", "order"))
        ordering = ["order"]

    def __str__(self) -> str:
        return f"{self.course.title} ({self.order}) - {self.exercise.title}"
