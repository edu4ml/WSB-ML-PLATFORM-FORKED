from dataclasses import dataclass

from infra.command import Command
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class CreateCourse(Command):
    parent_uuid: int = None  # indicates initial command (no parent yet!)

    title: str
    description: str

    class Meta:
        name = CommandTypes.CREATE_COURSE
        is_initial = True

        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return CreateCourse(
            title=request.data.get("title"),
            description=request.data.get("description", ""),
        )
