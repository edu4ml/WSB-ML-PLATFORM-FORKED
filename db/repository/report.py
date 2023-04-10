from db.models.courses import (
    CourseEnrollment,
    CourseStep as CourseStepModel,
    CourseStepUserProgress,
    Submission as SubmissionDbModel,
)
from elearning.entities.report import (
    CourseStudents,
    CourseInfo,
    CourseStep,
    Report,
    StudentCourseProgress,
    StudentInfo,
    Submission,
)
from infra.repository import ModelRepository


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
        submissions = SubmissionDbModel.objects.filter(
            course_step__course__in=author_courses
        )

        return [
            Submission(
                uuid=submission.uuid,
                user=StudentInfo(
                    uuid=submission.user.uuid,
                    email=submission.user.email,
                ),
                title=submission.title,
                description=submission.description,
                status=submission.status,
                file_link=submission.file.url,
                course=CourseInfo(
                    uuid=submission.course_step.course.uuid,
                    title=submission.course_step.course.title,
                ),
                course_component=CourseStep(
                    uuid=submission.course_step.uuid,
                    title=submission.course_step.component.title,
                ),
            )
            for submission in submissions
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
                    steps_completed=completed_steps_count,
                    current_step=CourseStep(
                        uuid=current_step.uuid,
                        title=current_step.component.title,
                    ),
                    is_completed=enrollment.is_completed,
                    progress=int(completed_steps_count / course.steps.count() * 100),
                )

                course_students.append(student_progress)

            course_info = CourseStudents(
                uuid=course.uuid,
                title=course.title,
                description=course.description,
                students=course_students,
            )

            courses_students_progress.append(course_info)

        return courses_students_progress
