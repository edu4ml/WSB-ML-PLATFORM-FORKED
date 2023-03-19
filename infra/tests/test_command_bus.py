from dataclasses import dataclass

from mock import Mock

from infra.command import Command
from infra.command_bus import CommandBus
from infra.command_handler import CommandHandler
from rest_framework.request import Request


@dataclass
class TestCommand(Command):
    foo: str
    bar: str

    class Meta:
        name = "TESTCOMMAND"


def test_can_register_service_to_command():
    command_bus = CommandBus()
    dummy_service = CommandHandler(event_bus=Mock(), repository=Mock())

    command_bus.register(service=dummy_service, to=TestCommand)

    assert TestCommand in command_bus.services.keys()


# def test_can_issue_command_and_service_is_called():
#     command_bus = CommandBus()
#     dummy_service = Mock()

#     command_bus.register(service=dummy_service, to=TestCommand)
#     # command = TestCommand(foo="foo_value", bar="bar_value", parent_uuid=1)

#     command_bus.issue("TESTCOMMAND")
#     # FIXME!
#     # assert dummy_service.handle.called
