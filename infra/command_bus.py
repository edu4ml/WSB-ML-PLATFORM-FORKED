from django.core.exceptions import PermissionDenied

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.logging import logger
from shared.enums import ApiErrors

from .exceptions import CommandBusException


@logger
class CommandBus:
    """
    - Messages (commands) signal the user's intention. Examples are CreateArticle or RegisterUser.
    - One command is handled by exactly one handler.
    - A command does not return any values.
    """

    def __init__(self):
        self.services: dict[Command, CommandHandler] = dict()

    def register(self, service: CommandHandler, to: Command) -> None:
        if to in self.services.keys():
            raise CommandBusException(ApiErrors.COMMAND_ALREADY_EXISTS, 500)
        self.services[to] = service

    def issue(self, request, **kwargs):
        commandBaseClass = self._get_command_base_class(request)
        if not self._is_allowed_to_create_command(request, commandBaseClass):
            raise PermissionDenied
        cmd = commandBaseClass.build_from_request(request, **kwargs)

        self.logger.info(f"{cmd} issued into command bus")

        if cmd.__class__ in self.services.keys():
            return self.services[cmd.__class__].handle(cmd)
        else:
            raise CommandBusException(ApiErrors.HANDLER_DOES_NOT_EXITS, 501)

    def _is_allowed_to_create_command(self, request, commandBaseClass: Command):
        return request.user.roles.filter(name__in=commandBaseClass.Meta.roles).exists()

    def _get_command_base_class(self, request):
        cmd_type = request.data.get("type")
        for commandBaseClass in self.services.keys():
            if commandBaseClass.Meta.name == cmd_type:
                return commandBaseClass
        raise CommandBusException(ApiErrors.COMMAND_TYPE_NOT_SUPPORTED, 400)

    def __str__(self):
        repr = "Command Bus\n"
        for key, value in self.services.items():
            repr += f"- Command: {key} is handled by: {value} \n"
        return repr
