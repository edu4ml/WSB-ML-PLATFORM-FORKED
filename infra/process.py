from infra.command_bus import CommandBus


class Process:
    def __init__(self, command_bus: CommandBus) -> None:
        self.command_bus = command_bus

    def handle(self):
        # do action for registered events
        pass
        # action here means issue a command to command bus
        #
        sample_command = None
        self.command_bus.issue(sample_command)
