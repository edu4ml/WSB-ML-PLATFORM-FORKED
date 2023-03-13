from infra.command_bus import CommandBus
from infra.event_bus import EventBus

from db.repository import RepositoryRoot
from elearning.courses.configuration import CourseConfiguration


class Configuration:
    def __init__(self, repository: RepositoryRoot = None) -> None:
        self.command_bus = CommandBus()
        self.event_bus = EventBus()
        self.repository = repository if repository else RepositoryRoot()

    def configure(self):
        self.course_config = CourseConfiguration(
            self.command_bus, self.event_bus, self.repository.course
        )

    def __repr__(self):
        repr = "Global App configuration \n\n"
        repr += f"{str(self.command_bus)}\n"

        return repr
