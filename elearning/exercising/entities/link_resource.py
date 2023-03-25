from dataclasses import dataclass


@dataclass
class LinkResource:
    title: str
    url: str


@dataclass
class ExternalResource:
    title: str
    url: str
