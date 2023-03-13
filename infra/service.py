from infra.command import Command
from infra.event_bus import EventBus
from infra.repository import Repository


class Service:
    event_bus = None
    emitting_event = None
    repository = None

    def __init__(self, event_bus: EventBus, repository: Repository) -> None:
        self.event_bus = event_bus
        self.repository = repository

    def handle(self, command: Command):
        self._handle_command(command)
        self._emit_event()

    def _handle_command(self, command: Command):
        raise NotImplementedError

    def _emit_event(self):
        self.event_bus.publish(self.emitting_event)

    def with_obj(self, obj_id, obj=None):
        return self.repository.with_obj(obj_id, obj)
