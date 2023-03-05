from django.contrib import admin

from course_tracker.models.answer import Answer
from course_tracker.models.course import Course
from course_tracker.models.course_enrollment import CourseEnrollment
from course_tracker.models.course_exercise import CourseExercise
from course_tracker.models.exercise import Exercise
from course_tracker.models.exercise_completion import ExerciseCompletion
from course_tracker.models.exericse_attempt import ExerciseAttempt
from course_tracker.models.question import Question
from course_tracker.models.quiz import Quiz
from course_tracker.models.quiz_solution import QuizSolution
from course_tracker.models.resource import Resource
from course_tracker.models.user_question_response import UserQuestionResponse


# Register your models here.

admin.site.register(Course)
admin.site.register(CourseExercise)
admin.site.register(Exercise)
admin.site.register(ExerciseAttempt)
admin.site.register(ExerciseCompletion)
admin.site.register(CourseEnrollment)
admin.site.register(Resource)
admin.site.register(Quiz)
admin.site.register(QuizSolution)
admin.site.register(Question)
admin.site.register(UserQuestionResponse)
admin.site.register(Answer)
