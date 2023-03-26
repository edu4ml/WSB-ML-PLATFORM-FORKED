from django.conf import settings
from django.db import models
from db.models.external_resources import ExternalResource

from shared.enums import CourseStepComponentTypes, CourseStepEvaluationTypes

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
    title = models.CharField(max_length=100)
    description = models.TextField()
    resources = models.ManyToManyField(ExternalResource, blank=True)

    type = models.CharField(
        max_length=40,
        choices=CourseStepComponentTypes.choices(),
        default=CourseStepComponentTypes.UNKNOWN,
    )

    def __str__(self) -> str:
        return f"{self.title} ({self.type})"  # pragma: no cover


class CourseStep(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="steps")
    order = models.PositiveIntegerField()

    evaluation_type = models.CharField(
        max_length=40,
        choices=CourseStepEvaluationTypes.choices(),
        default=CourseStepEvaluationTypes.SELF_EVALUATED,
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
        return f"{self.course.title} ({self.order})"  # - {self.component.title}"  # pragma: no cover


class CourseStepUserCompletion(TimestampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="course_steps_completion",
    )

    completed_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    component = models.ForeignKey(CourseComponent, on_delete=models.PROTECT)

    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "component", "course")

    def __str__(self) -> str:
        return (
            f"{self.user.get_username()} - {self.component.title}"  # pragma: no cover
        )
