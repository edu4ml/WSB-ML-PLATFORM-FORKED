class CommandBusException(Exception):
    def __init__(self, message, status_code, *args: object) -> None:
        super().__init__(*args)
        self.message = message
        self.status_code = status_code


class RequestException(Exception):
    def __init__(self, message, status_code, *args: object) -> None:
        super().__init__(*args)
        self.message = message
        self.status_code = status_code
