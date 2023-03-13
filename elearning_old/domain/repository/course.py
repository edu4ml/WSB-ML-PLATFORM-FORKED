# from typing import List
# from course_tracker.domain import Course
# from course_tracker.infra.models import User


# class CourseRepository:
#     """
#     The idea is to retrieve a domain object
#     and opare later on it.
#     This is an interface for a database implementation
#     """

#     @classmethod
#     def retrieve(cls, title: str, user: User) -> Course:
#         """
#         the idea is that course name will be unique
#         and id is db detail
#         """
#         return Course(title=title)

#     @classmethod
#     def list(cls, user: User) -> List[Course]:
#         return [
#             Course(title="cours_1"),
#             Course(title="cours_2"),
#             Course(title="cours_3"),
#         ]
