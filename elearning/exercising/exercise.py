from dataclasses import dataclass, field
from typing import List
from .entities import LinkResource


@dataclass
class Exercise:
    """
    Main Aggregate in esercising domin
    """

    id: int
    title: str
    description: str
    resources: List[LinkResource] = field(default_factory=lambda: list())
