from dataclasses import dataclass

from infra.command import Command
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class EnrollForCourse(Command):
    user_uuid: int

    class Meta:
        name = CommandTypes.ENROLL_FOR_COURSE
        roles = [UserRoles.TEACHER, UserRoles.STUDENT, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return EnrollForCourse(
            parent_uuid=kwargs["course_uuid"], user_uuid=request.data.get("user_uuid")
        )
