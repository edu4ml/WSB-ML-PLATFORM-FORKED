from django.core.exceptions import ObjectDoesNotExist

from course_tracker.models import Course, CourseEnrollment


class CourseEnrollmentService:
    def enroll_user(self, course_id, user):
        try:
            course = Course.objects.get(id=course_id)
        except ObjectDoesNotExist:
            raise ValueError(f"Course with id {course_id} does not exist")

        CourseEnrollment.objects.create(user=user, course=course)

    # def mark_exercise_complete(self, exercise_attempt_id):
    #     try:
    #         exercise_attempt = ExerciseAttempt.objects.get(id=exercise_attempt_id)
    #     except ObjectDoesNotExist:
    #         raise ValueError(
    #             f"ExerciseAttempt with id {exercise_attempt_id} does not exist"
    #         )

    #     exercise = exercise_attempt.exercise

    #     try:
    #         exercise_completion = ExerciseCompletion.objects.get(
    #             exercise=exercise, user=exercise_attempt.user
    #         )
    #     except ObjectDoesNotExist:
    #         exercise_completion = ExerciseCompletion(
    #             exercise=exercise, user=exercise_attempt.user
    #         )

    #     exercise_completion.completed = True
    #     exercise_completion.save()
