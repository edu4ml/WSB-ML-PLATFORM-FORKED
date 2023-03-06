from course_tracker.models import Course
from course_tracker.read_models import CourseReadModel


class CourseCatalogService:
    def list(self, user):
        courses = Course.objects.all()
        return [CourseReadModel(course=course, user=user) for course in courses]

    def retrieve(self, user, course_id):
        try:
            return CourseReadModel(course=Course.objects.get(id=course_id), user=user)
        except Course.DoesNotExist:
            return None
