from dataclasses import dataclass
from typing import List

from elearning.reporting.entities.report_courses import Course
from elearning.reporting.entities.report_submissions import Submission


@dataclass
class Report:
    courses: List[Course]
    submissions: List[Submission]
