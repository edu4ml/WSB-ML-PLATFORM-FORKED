from django.db import models

from course_tracker.models import Course, CourseComponent, TimestampedModel


class CourseStep(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    component = models.ForeignKey(CourseComponent, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    requires_file = models.BooleanField(default=False)
    requires_test = models.BooleanField(default=False)
    requires_manual_review = models.BooleanField(default=True)
    is_self_evaluated = models.BooleanField(default=False)

    class Meta:
        unique_together = (("course", "component"), ("course", "order"))
        ordering = ["order"]

    def __str__(self) -> str:
        return f"{self.course.title} ({self.order}) - {self.component.title}"
