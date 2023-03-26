from db.models import CustomUser as UserDbModel, Role
from elearning.coursing.entities.user import User
from infra.logging import logger
from infra.repository import RepositoryCrud, RepositoryEntityBuilder
from shared.enums import UserRoles


class UserRepositoryEntityBuilder(RepositoryEntityBuilder):
    root_entity = User

    def from_model(self, obj):
        return self.root_entity(
            uuid=obj.uuid,
            email=obj.email,
        )


@logger
class UserRepository(RepositoryCrud):
    root_model = UserDbModel
    root_entity = User
    entity_builder = UserRepositoryEntityBuilder()

    def get_or_create(self, email, **kwargs):
        user, created = UserDbModel.objects.get_or_create(email=email, **kwargs)
        user.roles.add(Role.objects.get(name=UserRoles.STUDENT))

        if created:
            # this happens when logging via google
            # password is set as unusable
            user.set_unusable_password()
        return user
