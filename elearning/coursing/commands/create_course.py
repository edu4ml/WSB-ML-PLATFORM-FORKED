from dataclasses import dataclass
from infra.command import Command


@dataclass(kw_only=True)
class CreateCourse(Command):
    parent_id: int = None
    title: str
    description: str

    class Meta:
        name = "CREATE_COURSE"
