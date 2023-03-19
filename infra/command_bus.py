from infra.command import Command
from infra.command_handler import CommandHandler
from infra.logging import logger
from shared.enums import CommandTypes
from .exceptions import (
    CommandAlreadyExistException,
    CommandHandlerDoesNotExistException,
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

    def issue(self, cmd: Command):
        self.logger.info(f"{cmd} issued into command bus")

        if cmd.__class__ in self.services.keys():
            return self.services[cmd.__class__].handle(cmd)
        else:
            raise CommandHandlerDoesNotExistException(
                f"Command handler for {cmd.__class__} does not exists or it is not registered"
            )

    def _build_command(type: CommandTypes, request, **kwargs):
        pass

    def __str__(self):
        repr = "Command Bus\n"
        for key, value in self.services.items():
            repr += f"- Command: {key} is handled by: {value} \n"
        return repr
