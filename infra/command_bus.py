from django.core.exceptions import PermissionDenied

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.logging import logger
from shared.enums import CommandApiErrors

from .exceptions import (
    CommandAlreadyExistException,
    CommandHandlerDoesNotExistException,
    CommandNotSupported,
)


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
            raise CommandAlreadyExistException
        self.services[to] = service

    def issue(self, request, **kwargs):
        cmd = self._build_command(request, **kwargs)

        if not self._is_allowed_to_create_command(request, cmd):
            raise PermissionDenied

        self.logger.info(f"{cmd} issued into command bus")

        if cmd.__class__ in self.services.keys():
            return self.services[cmd.__class__].handle(cmd)
        else:
            raise CommandHandlerDoesNotExistException(
                CommandApiErrors.HANDLER_DOES_NOT_EXITS
            )

    def _is_allowed_to_create_command(self, request, command: Command):
        return request.user.roles.filter(name__in=command.Meta.roles).exists()

    def _build_command(self, request, **kwargs):
        cmd_type = request.data.get("type")
        for command in self.services.keys():
            if command.Meta.name == cmd_type:
                return command.build_from_request(request, **kwargs)
        raise CommandNotSupported(CommandApiErrors.COMMAND_TYPE_NOT_SUPPORTED)

    def __str__(self):
        repr = "Command Bus\n"
        for key, value in self.services.items():
            repr += f"- Command: {key} is handled by: {value} \n"
        return repr
