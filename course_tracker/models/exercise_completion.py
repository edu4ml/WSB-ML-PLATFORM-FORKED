from django.contrib.auth import get_user_model
from django.db import models

from course_tracker.models import Exercise, ExerciseAttempt, TimestampedModel


User = get_user_model()


class ExerciseCompletion(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    is_file_passed = models.BooleanField(default=False)
    is_test_passed = models.BooleanField(default=False)
    is_reviewed = models.BooleanField(default=False)
    is_self_evaluated = models.BooleanField(default=False)
    attempts = models.ManyToManyField(ExerciseAttempt)

    class Meta:
        unique_together = ("user", "exercise")
