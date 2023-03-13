from django.contrib.auth import get_user_model
from django.db import models

from course_tracker.models.mixin import TimestampedModel
from course_tracker.models.quiz import Quiz
from course_tracker.models.user_question_response import UserQuestionResponse


User = get_user_model()


class QuizSolution(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user_responses = models.ManyToManyField(
        UserQuestionResponse, related_name="test_solutions"
    )
