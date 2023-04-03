from dataclasses import dataclass


@dataclass
class Submission:
    user: str
    title: str
    description: str
    course_component: str
    course: str
    status: str
    file_link: str
