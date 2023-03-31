from db.models.courses import CourseStepUserProgress
from elearning.reporting.entities.student import (
    StudentInCourseStepEvaluationAttempt,
    StudentWithProgress,
    StudentInCourseProgress,
    StudentInCourseStepProgress,
)
from infra.repository import ModelRepository
from elearning.reporting.teacher import Teacher
from elearning.reporting.entities.course import Course


class ReportRepository(ModelRepository):
    def get_for_teacher(self):
        assert (
            self.user and self.user.is_teacher()
        ), "User needs to be a teacher to generate Teacher Report"
        return Teacher(
            courses=[
                Course(
                    uuid=course.uuid,
                    title=course.title,
                    students=[
                        StudentWithProgress(
                            uuid=enrolment.user.uuid,
                            email=enrolment.user.email,
                            progress=StudentInCourseProgress(
                                has_completed_course=enrolment.is_completed,
                                steps=self.get_course_steps_progress_for_user(
                                    course, enrolment.user
                                ),
                            ),
                        )
                        for enrolment in course.enrollments.all()
                    ],
                )
                for course in self.user.created_courses.all()
            ],
        )

    def get_course_steps_progress_for_user(self, course, student):
        steps_progress = []

        for step in course.steps.all():
            try:
                step_completion = CourseStepUserProgress.objects.get(
                    course=course, user=student, object_uuid=step.object.uuid
                )

                steps_progress.append(
                    StudentInCourseStepProgress(
                        title=step.object.title,
                        order=step.order,
                        is_completed=step_completion.is_completed,
                        completed_at=step_completion.completed_at,
                        evaluation_status=[
                            StudentInCourseStepEvaluationAttempt(
                                title=evaluation_attempt.title,
                                description=evaluation_attempt.description,
                                status=evaluation_attempt.status,
                            )
                            for evaluation_attempt in step.evaluation_attempts.filter(
                                user=student
                            )
                        ],
                    )
                )
            except Exception:
                steps_progress.append(
                    StudentInCourseStepProgress(
                        title=step.object.title,
                        order=step.order,
                        is_completed=False,
                        completed_at=None,
                        evaluation_status=[
                            StudentInCourseStepEvaluationAttempt(
                                title=evaluation_attempt.title,
                                description=evaluation_attempt.description,
                                status=evaluation_attempt.status,
                            )
                            for evaluation_attempt in step.evaluation_attempts.filter(
                                user=student
                            )
                        ],
                    )
                )

        return steps_progress
