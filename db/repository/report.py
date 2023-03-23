from db.models.courses import CourseStepUserCompletion
from elearning.reporting.entities.student import (
    StudentInCourse,
    StudentInCourseProgress,
    StudentInCourseStepProgress,
)
from infra.repository import Repository
from elearning.reporting.teacher import Teacher
from elearning.reporting.entities.course import Course
from django.contrib.contenttypes.fields import GenericRelation

from shared.enums import CourseStepEvaluationStatus


class ReportRepository(Repository):
    def get_for_teacher(self):
        assert (
            self.user and self.user.is_teacher()
        ), f"User needs to be a teacher to generate Teacher Report"
        return Teacher(
            courses=[
                Course(
                    uuid=course.uuid,
                    title=course.title,
                    students=[
                        StudentInCourse(
                            uuid=enrolment.user.uuid,
                            email=enrolment.user.email,
                            progress=StudentInCourseProgress(
                                has_completed_course=enrolment.is_completed,
                                steps=self.get_course_steps_progress_for_user(
                                    course, enrolment.user
                                ),
                            ),
                        )
                        for enrolment in course.enrolled_students.all()
                    ],
                )
                for course in self.user.created_courses.all()
            ],
        )

    def get_course_steps_progress_for_user(self, course, student):
        steps_progress = []

        for step in course.steps.all():
            try:
                step_completion = CourseStepUserCompletion.objects.get(
                    course=course, user=student, object_uuid=step.object.uuid
                )

                steps_progress.append(
                    StudentInCourseStepProgress(
                        title=step.object.title,
                        order=step.order,
                        is_completed=step_completion.is_completed,
                        completed_at=step_completion.completed_at,
                        evaluation_status=CourseStepEvaluationStatus.WAITING,
                    )
                )
            except Exception as e:
                steps_progress.append(
                    StudentInCourseStepProgress(
                        title=step.object.title,
                        order=step.order,
                        is_completed=False,
                        completed_at=None,
                        evaluation_status=CourseStepEvaluationStatus.UNKNOWN,
                    )
                )

        return steps_progress
