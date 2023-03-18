from .mixin import TimestampedModel
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.conf import settings


class Course(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_draft = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title  # pragma: no cover


class CourseEnrollment(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.course.title} - {self.user.get_username()}"  # pragma: no cover


class CourseStep(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    requires_file = models.BooleanField(default=False)
    requires_test = models.BooleanField(default=False)
    requires_manual_review = models.BooleanField(default=True)
    is_self_evaluated = models.BooleanField(default=False)

    step_content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, default=None, blank=True
    )
    step_object_id = models.PositiveIntegerField(null=True, default=None, blank=True)
    step_object = GenericForeignKey("step_content_type", "step_object_id")

    class Meta:
        unique_together = (
            ("course", "step_content_type", "step_object_id"),
            ("course", "order"),
        )
        ordering = ["order"]

    def __str__(self) -> str:
        return f"{self.course.title} ({self.order}) - {self.step_object.title}"  # pragma: no cover


class CourseStepUserCompletion(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    completed_at = models.DateTimeField(blank=True, null=True)

    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, default=None
    )
    object_id = models.PositiveIntegerField(null=True, default=None)
    object = GenericForeignKey("content_type", "object_id")

    # is_file_passed = models.BooleanField(default=False)
    # is_test_passed = models.BooleanField(default=False)
    # is_reviewed = models.BooleanField(default=False)
    # is_self_evaluated = models.BooleanField(default=False)
    # attempts = models.ManyToManyField(ExerciseAttempt)

    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "content_type", "object_id", "course")

    def __str__(self) -> str:
        return f"{self.user.get_username()} - {self.object.title}"  # pragma: no cover
