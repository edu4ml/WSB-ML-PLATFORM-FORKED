from django.contrib.auth import get_user_model
from django.db import models

from course_tracker.models import Exercise, ExerciseAttempt, TimestampedModel


User = get_user_model()


class ExerciseCompletion(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(blank=True, null=True)
    is_file_passed = models.BooleanField(default=False)
    is_test_passed = models.BooleanField(default=False)
    is_reviewed = models.BooleanField(default=False)
    is_self_evaluated = models.BooleanField(default=False)
    attempts = models.ManyToManyField(ExerciseAttempt)

    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "exercise")

    def __str__(self) -> str:
        return f"{self.user.get_username()} - {self.exercise.title}"

    def save(self, *args, **kwargs) -> None:
        if any(
            [
                self.exercise.requires_file and not self.is_file_passed,
                self.exercise.requires_test and not self.is_test_passed,
                self.exercise.requires_manual_review and not self.is_reviewed,
                self.exercise.is_self_evaluated and not self.is_self_evaluated,
            ]
        ):
            self.is_completed = False
        else:
            self.is_completed = True

        return super().save(*args, **kwargs)
