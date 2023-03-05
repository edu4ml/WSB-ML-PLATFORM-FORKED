# services.py

from django.core.exceptions import ObjectDoesNotExist

from course_tracker.models import (
    Course,
    Exercise,
    ExerciseAttempt,
    ExerciseCompletion,
)


class CourseEnrollmentService:
    def enroll_user(self, course_id, user_id):
        print("HeY! enrolling user: ", course_id, user_id)
        pass
        # try:
        #     course = Course.objects.get(id=course_id)
        # except ObjectDoesNotExist:
        #     raise ValueError(f"Course with id {course_id} does not exist")

        # if course.students.filter(id=user_id).exists():
        #     raise ValueError(f"User with id {user_id} does not exist")

        # course.students.add(user_id)
        # course.save()

    def mark_exercise_complete(self, exercise_attempt_id):
        try:
            exercise_attempt = ExerciseAttempt.objects.get(id=exercise_attempt_id)
        except ObjectDoesNotExist:
            raise ValueError(
                f"ExerciseAttempt with id {exercise_attempt_id} does not exist"
            )

        exercise = exercise_attempt.exercise

        try:
            exercise_completion = ExerciseCompletion.objects.get(
                exercise=exercise, user=exercise_attempt.user
            )
        except ObjectDoesNotExist:
            exercise_completion = ExerciseCompletion(
                exercise=exercise, user=exercise_attempt.user
            )

        exercise_completion.completed = True
        exercise_completion.save()
