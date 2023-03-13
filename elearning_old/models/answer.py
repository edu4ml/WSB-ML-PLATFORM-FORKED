from django.db import models

from course_tracker.models.mixin import TimestampedModel
from course_tracker.models.question import Question


class Answer(TimestampedModel):
    text = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    is_correct = models.BooleanField(default=False)
