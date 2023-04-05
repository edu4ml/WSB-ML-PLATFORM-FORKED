from dataclasses import dataclass
from datetime import datetime
from typing import List
from db.models.auth import CustomUser
from shared.enums import UserRoles


@dataclass(kw_only=True)
class Command:
    """
    Baseclass for commands to interact with domain
    """

    parent_uuid: int | None
    created_at: datetime = datetime.now()
    issuer: CustomUser

    @classmethod
    def build_from_request(cls, request, **kwargs):
        raise NotImplementedError

    class Meta:
        name: str
        is_initial: bool
        roles: List[UserRoles] = []
