from dataclasses import dataclass
from uuid import UUID
from shared.enums import CourseStepContentTypes


@dataclass
class Evaluation:
    id: UUID
    title: str
    description: str

    content_type: str = CourseStepContentTypes.FILE_EVALUATION_TYPE
