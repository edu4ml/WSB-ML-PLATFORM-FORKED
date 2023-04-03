# from db.models.courses import CourseStepUserProgress
from db.models.courses import (
    CourseEnrollment,
    CourseStep as CourseStepModel,
    CourseStepUserProgress,
    EvaluationAttempt,
)
from elearning.reporting.entities.report_submissions import Submission
from infra.repository import ModelRepository
from elearning.reporting.entities.report import Report
from elearning.reporting.entities.report_courses import (
    Course,
    CourseStep,
    StudentCourseProgress,
    StudentInfo,
)


class ReportRepository(ModelRepository):
    def get_course_report(self):
        if self.user.is_teacher():
            return self.get_for_teacher()
        elif self.user.is_student():
            return self.get_for_student()

    def get_for_student(self):
        return []

    def get_for_teacher(self):
        return Report(
            courses=self._get_students_progress_for_courses(),
            submissions=self._get_submission_inbox(),
        )

    def _get_submission_inbox(self):
        author_courses = self.user.created_courses.all()
        evaluation_attempts = EvaluationAttempt.objects.filter(
            course_step__course__in=author_courses
        )

        return [
            Submission(
                user=attempt.user.uuid,
                title=attempt.title,
                description=attempt.description,
                status=attempt.status,
                file_link=attempt.file.url,
                course=attempt.course_step.course.uuid,
                course_component=attempt.course_step.component.uuid,
            )
            for attempt in evaluation_attempts
        ]

    def _get_students_progress_for_courses(self):
        author_courses = self.user.created_courses.all()
        course_enrollments = CourseEnrollment.objects.filter(course__in=author_courses)

        courses_students_progress = []

        for course in author_courses:
            course_students = []

            for enrollment in course_enrollments.filter(course=course):
                student = enrollment.user
                completed_steps = CourseStepUserProgress.objects.filter(
                    user=student, step__course=enrollment.course, is_completed=True
                )
                completed_steps_count = completed_steps.count()

                current_step = (
                    CourseStepModel.objects.filter(course=enrollment.course)
                    .exclude(uuid__in=completed_steps.values_list("step", flat=True))
                    .order_by("order")
                    .first()
                )

                student_progress = StudentCourseProgress(
                    student=StudentInfo(
                        uuid=student.uuid,
                        email=student.email,
                    ),
                    course=enrollment.course.uuid,
                    completed_steps=completed_steps_count,
                    current_step=CourseStep(
                        uuid=current_step.uuid,
                        title=current_step.component.title,
                    ),
                    is_completed=enrollment.is_completed,
                )

                course_students.append(student_progress)

            course_info = Course(
                course=course.uuid,
                title=course.title,
                students=course_students,
            )

            courses_students_progress.append(course_info)

        return courses_students_progress
