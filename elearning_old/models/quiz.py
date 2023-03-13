from django.db import models

from course_tracker.models.mixin import TimestampedModel
from course_tracker.models.question import Question


class Quiz(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    questions = models.ManyToManyField(Question, related_name="quizzes")
