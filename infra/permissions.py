from functools import wraps
from django.core.exceptions import PermissionDenied
from shared.enums import UserRoles


def api_has_one_of_the_roles(roles):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(api, request, *args, **kwargs):
            if request.user.roles.filter(name__in=[*roles, UserRoles.ADMIN]).exists():
                return view_func(api, request, *args, **kwargs)
            else:
                raise PermissionDenied

        return _wrapped_view

    return decorator
