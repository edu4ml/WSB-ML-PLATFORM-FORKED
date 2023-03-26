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


class CommandProcessingForbiddenException(CommandBusException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_403_FORBIDDEN


class CommandHandlerDoesNotExistException(CommandBusException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_501_NOT_IMPLEMENTED


class CommandNotSupported(CommandBusException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_400_BAD_REQUEST


class ApiException(Exception):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.message = args[0]


class BadRequestException(ApiException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_400_BAD_REQUEST


class NotFoundException(ApiException):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
        self.status_code = status.HTTP_404_NOT_FOUND
