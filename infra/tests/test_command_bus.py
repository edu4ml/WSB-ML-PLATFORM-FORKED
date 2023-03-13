from dataclasses import dataclass
from mock import Mock
from infra.command import Command
from infra.command_bus import CommandBus
from infra.service import Service


@dataclass
class TestCommand(Command):
    foo: str
    bar: str


def test_can_register_service_to_command():
    command_bus = CommandBus()
    dummy_service = Service()

    command_bus.register(service=dummy_service, to=TestCommand)

    assert TestCommand in command_bus.services.keys()


def test_can_issue_command_and_service_is_called():
    command_bus = CommandBus()
    dummy_service = Mock()

    command_bus.register(service=dummy_service, to=TestCommand)
    command = TestCommand(foo="foo_value", bar="bar_value")

    command_bus.issue(command)

    assert dummy_service.handle.called