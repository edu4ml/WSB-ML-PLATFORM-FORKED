from dataclasses import dataclass
from typing import List

from click import UUID


@dataclass
class CourseStep:
    uuid: UUID
    title: str


@dataclass
class StudentInfo:
    uuid: UUID
    email: str


@dataclass
class StudentCourseProgress:
    student: StudentInfo
    course: UUID
    completed_steps: int
    current_step: CourseStep
    is_completed: bool


@dataclass
class CourseInfo:
    uuid: UUID
    title: str


# --------------------------------


@dataclass
class CourseStudents:
    uuid: UUID
    title: str
    students: List[StudentCourseProgress]


@dataclass
class Submission:
    uuid: UUID
    user: StudentInfo
    title: str
    description: str
    course_component: CourseStep
    course: CourseInfo
    status: str
    file_link: str


# --------------------------------


@dataclass
class Report:
    courses: List[CourseStudents]
    submissions: List[Submission]
