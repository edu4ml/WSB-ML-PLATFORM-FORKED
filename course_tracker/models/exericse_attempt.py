from django.db import models

from course_tracker.models import (
    Exercise,
    QuizSolution,
    TimestampedModel,
    User,
)


class ExerciseAttempt(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    file_solution = models.FileField(blank=True, null=True)
    quiz_solution = models.ForeignKey(
        QuizSolution, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.exercise.title}"

    def successful_attempt(self):
        # Add your custom validation logic here
        return True
