from collections import defaultdict
from typing import List
from infra.event import Event
from infra.event_handler import EventHandler
from infra.logging import logger

# from infra.process import Process


@logger
class EventBus:
    """
    - Messages (events) signal an event has happened. Examples are ArticleWasCreated or UserWasRegistered.
    - One event can be handled by any number of handlers ([0, inf]).
    - Only holds primitives (strings, integers, booleans), not whole classes.
    - Events should not return values.
    """

    def __init__(self) -> None:
        self.event_handlers: dict[Event, List[EventHandler]] = defaultdict(list)

    def subscribe(self, process, to: List[EventHandler]):
        self.event_handlers[process].extend(to)

    def publish(self, event: Event) -> None:
        self.logger.info(f"Event Bus: Publishing event: {event}")
        for e in self.event_handlers[event]:
            e.handle(event)
