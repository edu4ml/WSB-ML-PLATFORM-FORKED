# from course_tracker.infra.repository import CourseRepository
# from course_tracker.domain import Course
# from course_tracker.infra.models import User


# def test_can_retrieve_a_course(user: User):
#     course_title = "TestCourseTitleWhichIsUnique"
#     course = CourseRepository.retrieve(title=course_title, user=user)

#     assert type(course) == Course
#     assert course.title == course_title


# def test_can_retrieve_a_list_of_courses(user: User):
#     user_courses = CourseRepository.list(user=user)

#     assert type(user_courses) == list
#     assert type(user_courses[0]) == Course
#     assert len(user_courses) == 3
