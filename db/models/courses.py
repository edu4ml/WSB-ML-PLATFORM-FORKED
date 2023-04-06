from django.conf import settings
from django.db import models
from db.models.external_resources import ExternalResource
from shared.enums import (
    CourseComponentType,
    CourseStepEvaluationType,
    CourseStepEvaluationStatus,
)

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
        related_name="created_courses",
    )
    is_draft = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title  # pragma: no cover


class CourseEnrollment(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="enrollments"
    )

    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("course", "user")

    def __str__(self) -> str:
        return f"{self.course.title} - {self.user.get_username()}"  # pragma: no cover


class CourseComponent(TimestampedModel):
    title = models.CharField(
        max_length=100,
    )
    description = models.TextField()
    resources = models.ManyToManyField(ExternalResource, blank=True)

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        default=None,
        blank=True,
        related_name="created_components",
    )

    type = models.CharField(
        max_length=40,
        choices=CourseComponentType.choices(),
        default=CourseComponentType.EXERCISE,
    )

    def __str__(self) -> str:
        return f"{self.title} ({self.type})"  # pragma: no cover


class CourseStep(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="steps")
    order = models.PositiveIntegerField()

    evaluation_type = models.CharField(
        max_length=40,
        choices=CourseStepEvaluationType.choices(),
        default=CourseStepEvaluationType.SELF_EVALUATED,
    )

    component = models.ForeignKey(
        CourseComponent, on_delete=models.PROTECT, null=True, default=None, blank=True
    )

    class Meta:
        unique_together = (
            ("course", "component"),
            ("course", "order"),
        )
        ordering = ["order"]

    def __str__(self) -> str:
        return f"{self.course.title} ({self.order}) - {self.component.title}"  # pragma: no cover

    @property
    def next_step(self):
        return self.course.steps.filter(order=self.order + 1).first()

    @property
    def is_last_step(self):
        return self.next_step is None


class CourseStepUserProgress(TimestampedModel):
    step = models.ForeignKey(CourseStep, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="steps_progress",
    )
    is_blocked = models.BooleanField(default=True)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        unique_together = ("user", "step")


class Submission(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    course_step = models.ForeignKey(
        CourseStep,
        null=True,
        on_delete=models.PROTECT,
        default=None,
        related_name="submissions",
    )
    file = models.FileField(upload_to="uploads/")
    status = models.CharField(
        max_length=40,
        choices=CourseStepEvaluationStatus.choices(),
        default=CourseStepEvaluationStatus.WAITING,
    )

    def __str__(self) -> str:
        return f"{self.course_step} | {self.user}  | {self.status}"
