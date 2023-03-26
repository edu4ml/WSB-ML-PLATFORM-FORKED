from rest_framework import status


class CommandBusException(Exception):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.message = args[0]


class CommandProcessingException(CommandBusException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_400_BAD_REQUEST


class CommandAlreadyExistException(CommandBusException):

    pass


class CommandHandlerDoesNotExistException(CommandBusException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_501_NOT_IMPLEMENTED


class CommandNotSupported(CommandBusException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_400_BAD_REQUEST


class CommandExecutionAlreadyInProgressException(CommandBusException):
    pass
