from infra.command import Command
from infra.event_bus import EventBus
from infra.repository import Repository


class CommandHandler:
    event_bus = None
    emitting_event = None
    repository = None
    parent_resource = None
    parent_resource_type = None

    def __init__(self, event_bus: EventBus, repository: Repository) -> None:
        self.event_bus = event_bus
        self.repository = repository

    def handle(self, command: Command):
        self._validate(command)
        response = self._handle_command(command)
        self._emit_event()
        return response

    def _retrieve_parent(self, command: Command):
        pass

    def _validate(self, command: Command):
        pass

    def _handle_command(self, command: Command):
        raise NotImplementedError

    def _emit_event(self):
        self.event_bus.publish(self.emitting_event)

    def with_obj(self, obj_uuid, obj=None):
        return self.repository.with_obj(obj_uuid, obj)
