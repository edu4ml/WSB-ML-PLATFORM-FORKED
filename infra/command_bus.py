from infra.logging import logger
from infra.service import Service
from infra.command import Command
from .exceptions import CommandAlreadyExistException


@logger
class CommandBus:
    """
    - Messages (commands) signal the user's intention. Examples are CreateArticle or RegisterUser.
    - One command is handled by exactly one handler.
    - A command does not return any values.
    """

    def __init__(self):
        self.services: dict[Command, Service] = dict()

    def register(self, service: Service, to: Command) -> None:
        if to in self.services.keys():
            raise CommandAlreadyExistException
        self.services[to] = service

    def issue(self, cmd: Command):
        self.logger.info(f"{cmd} issued into command bus")
        self.services[cmd.__class__].handle(cmd)

    def __str__(self):
        repr = "Command Bus\n"
        for key, value in self.services.items():
            repr += f"- Command: {key} is handled by: {value} \n"
        return repr
