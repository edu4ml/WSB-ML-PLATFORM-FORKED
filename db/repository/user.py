from db.models import CustomUser as User, Role
from infra.logging import logger
from infra.repository import Repository
from shared.enums import UserRoles


@logger
class UserRepository(Repository):
    root_model = User

    def get_or_create(self, email, **kwargs):
        user, created = User.objects.get_or_create(email=email, **kwargs)
        user.roles.add(Role.objects.get(name=UserRoles.STUDENT))

        if created:
            # this happens when logging via google
            # password is set as unusable
            user.set_unusable_password()
        return user
