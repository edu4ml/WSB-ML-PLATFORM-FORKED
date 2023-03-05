from django.contrib.auth import get_user_model

User = get_user_model()

from .mixin import TimestampedModel
from .resource import Resource
from .exercise import Exercise
from .course import Course
from .question import Question
from .answer import Answer
from .quiz import Quiz
from .quiz_solution import QuizSolution
from .exericse_attempt import ExerciseAttempt
from .exercise_completion import ExerciseCompletion
from .course_exercise import CourseExercise
from .course_enrollment import CourseEnrollment
