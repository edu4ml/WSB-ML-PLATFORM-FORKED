from db.models import CustomUser as UserDbModel, Role
from elearning.entities.user import User
from infra.logging import logger
from infra.repository import ModelRepository
from shared.enums import UserRoles


@logger
class UserRepository(ModelRepository):
    db_model = UserDbModel
    domain_model = User

    def get_or_create(self, email, **kwargs):
        user, created = UserDbModel.objects.get_or_create(email=email, **kwargs)
        user.roles.add(Role.objects.get(name=UserRoles.STUDENT))

        if created:
            # this happens when logging via google
            # password is set as unusable
            user.set_unusable_password()
        return user

    def from_model(self, obj):
        return self.domain_model(
            uuid=obj.uuid,
            email=obj.email,
        )
