from django.contrib.auth import get_user_model
from django.db import models

from course_tracker.models.answer import Answer
from course_tracker.models.mixin import TimestampedModel
from course_tracker.models.question import Question


User = get_user_model()


class UserQuestionResponse(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
