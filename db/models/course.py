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


class CourseComponentResource(TimestampedModel):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self) -> str:
        return self.title


class CourseComponent(TimestampedModel):
    STEP_TYPES = (
        ("TEST", "Test"),
        ("EXTERNAL_RESOURCE", "External Resource"),
        ("UNKNOWN", "Unknown step"),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    resources = models.ManyToManyField(CourseComponentResource, blank=True)

    type = models.CharField(max_length=20, choices=STEP_TYPES, default="UNKNOWN")

    def __str__(self):
        return self.title


class CourseComponentCompletion(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    component = models.ForeignKey(CourseComponent, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(blank=True, null=True)

    # is_file_passed = models.BooleanField(default=False)
    # is_test_passed = models.BooleanField(default=False)
    # is_reviewed = models.BooleanField(default=False)
    # is_self_evaluated = models.BooleanField(default=False)
    # attempts = models.ManyToManyField(ExerciseAttempt)

    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "component")

    def __str__(self) -> str:
        return f"{self.user.get_username()} - {self.component.title}"


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
