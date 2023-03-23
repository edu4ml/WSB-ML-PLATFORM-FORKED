from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from shared.enums import CourseStepEvaluationTypes

from .mixin import TimestampedModel


class Course(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        null=True, 
        default=None,
        blank=True,
        related_name='created_courses'
    
    )
    is_draft = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title  # pragma: no cover


class CourseEnrollment(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(
        Course, 
        on_delete=models.CASCADE,
        related_name="enrolled_students"
    )
    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            ("course", "user")
        )

    def __str__(self) -> str:
        return f"{self.course.title} - {self.user.get_username()}"  # pragma: no cover


class CourseStep(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="steps")
    order = models.PositiveIntegerField()

    evaluation_type = models.CharField(
        max_length=40,
        choices=CourseStepEvaluationTypes.choices(),
        default=CourseStepEvaluationTypes.SELF_EVALUATED,
    )

    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, default=None, blank=True
    )
    object_uuid = models.UUIDField(null=True, default=None, blank=True)
    object = GenericForeignKey("content_type", "object_uuid")

    class Meta:
        unique_together = (
            ("course", "content_type", "object_uuid"),
            ("course", "order"),
        )
        ordering = ["order"]

    def __str__(self) -> str:
        return f"{self.course.title} ({self.order}) - {self.object.title}"  # pragma: no cover


class CourseStepUserCompletion(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="course_steps_completion"
    )

    completed_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, default=None
    )
    object_uuid = models.UUIDField(null=True, default=None)
    object = GenericForeignKey("content_type", "object_uuid")

    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "content_type", "object_uuid", "course")

    def __str__(self) -> str:
        return f"{self.user.get_username()} - {self.object.title}"  # pragma: no cover
