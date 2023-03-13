# some relation between command issues and the service
# command invoke service method which orchestrate entities
from elearning.courses.commands import CreateCourse
from elearning.courses.service import OnCreateCourse
from infra.repository import Repository
from infra.command_bus import CommandBus
from infra.event_bus import EventBus


class CourseConfiguration:
    def __init__(
        self, command_bus: CommandBus, event_bus: EventBus, repository: Repository
    ) -> None:
        command_bus.register(
            service=OnCreateCourse(event_bus=event_bus, repository=repository),
            to=CreateCourse,
        )