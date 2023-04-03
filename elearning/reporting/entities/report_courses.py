from dataclasses import dataclass
from typing import List
from uuid import UUID


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
class Course:
    course: UUID
    title: str
    students: List[StudentCourseProgress]
