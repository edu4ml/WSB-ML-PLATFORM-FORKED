from course_tracker.models import Course as CourseModel
from course_tracker.domain import Course


class CourseCatalogService:
    def list(self, user):
        courses = CourseModel.objects.all()
        return [Course(course=course, user=user) for course in courses]

    def retrieve(self, user, course_id):
        try:
            return Course(course=CourseModel.objects.get(id=course_id), user=user)
        except CourseModel.DoesNotExist:
            return None
