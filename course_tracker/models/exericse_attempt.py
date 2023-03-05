from django.contrib.auth import get_user_model
from django.db import models

from course_tracker.models import Exercise, QuizSolution, TimestampedModel


User = get_user_model()


class ExerciseAttempt(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    file_solution = models.FileField(blank=True, null=True)
    quiz_solution = models.ForeignKey(QuizSolution, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.exercise.title}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_progress()

    # def update_progress(self):
    #     try:
    #         completion = ExerciseCompletion.objects.get(user=self.user, exercise=self.exercise)
    #     except ExerciseCompletion.DoesNotExist:
    #         completion = ExerciseCompletion(user=self.user, exercise=self.exercise)
    #     if self.successful_attempt():
    #         completion.completed = True
    #     completion.save()

    def successful_attempt(self):
        # Add your custom validation logic here
        return True
