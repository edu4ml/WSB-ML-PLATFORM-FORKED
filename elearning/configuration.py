from db.repository import RepositoryRoot
from elearning.commands.approve_submission import ApproveSubmission, OnSubmissionApprove
from elearning.commands.create_component import (
    CreateComponent,
    OnCreateComponent,
)
from elearning.commands.publish_course import OnPublishCourse, PublishCourse
from elearning.commands.reject_submission import OnSubmissionReject, RejectSubmission
from elearning.commands.submit_submission import OnSubmitSubmission, SubmitSubmission
from infra.command_bus import CommandBus
from infra.event_bus import EventBus
from elearning.commands import (
    OnCreateCourse,
    OnCompleteCourseStep,
    CompleteCourseStep,
    CreateCourse,
    EnrollForCourse,
    UpdateCourse,
    OnEnrollForCourse,
    OnUpdateCourse,
)


class Configuration:
    def __init__(self, repository: RepositoryRoot = None) -> None:
        self.command_bus = CommandBus()
        self.event_bus = EventBus()
        self.repository = repository if repository else RepositoryRoot()

    def configure(self):
        self.command_bus.register(
            service=OnCreateCourse(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=CreateCourse,
        )
        self.command_bus.register(
            service=OnEnrollForCourse(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=EnrollForCourse,
        )
        self.command_bus.register(
            service=OnCompleteCourseStep(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=CompleteCourseStep,
        )
        self.command_bus.register(
            service=OnUpdateCourse(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=UpdateCourse,
        )
        self.command_bus.register(
            service=OnSubmitSubmission(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=SubmitSubmission,
        )
        self.command_bus.register(
            service=OnCreateComponent(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=CreateComponent,
        )
        self.command_bus.register(
            service=OnSubmissionApprove(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=ApproveSubmission,
        )
        self.command_bus.register(
            service=OnSubmissionReject(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=RejectSubmission,
        )
        self.command_bus.register(
            service=OnPublishCourse(
                event_bus=self.event_bus, repository=self.repository
            ),
            to=PublishCourse,
        )

    def __repr__(self):  # pragma: no cover
        repr = "Global App configuration \n\n"
        repr += f"{str(self.command_bus)}\n"

        return repr
