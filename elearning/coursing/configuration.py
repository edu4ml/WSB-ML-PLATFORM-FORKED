# some relation between command issues and the service
# command invoke service method which orchestrate entities
from db.repository.configuration import RepositoryRoot
from elearning.coursing.commands import (
    OnCreateCourse,
    OnCompleteCourseStep,
    CompleteCourseStep,
    CreateCourse,
    EnrollForCourse,
    UpdateCourse,
    OnEnrollForCourse,
    OnUpdateCourse,
)
from infra.command_bus import CommandBus
from infra.event_bus import EventBus


class CourseConfiguration:
    def __init__(
        self, command_bus: CommandBus, event_bus: EventBus, repository: RepositoryRoot
    ) -> None:
        command_bus.register(
            service=OnCreateCourse(event_bus=event_bus, repository=repository),
            to=CreateCourse,
        )
        command_bus.register(
            service=OnEnrollForCourse(event_bus=event_bus, repository=repository),
            to=EnrollForCourse,
        )
        command_bus.register(
            service=OnCompleteCourseStep(event_bus=event_bus, repository=repository),
            to=CompleteCourseStep,
        )
        command_bus.register(
            service=OnUpdateCourse(event_bus=event_bus, repository=repository),
            to=UpdateCourse,
        )
