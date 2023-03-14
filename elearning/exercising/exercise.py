from dataclasses import dataclass


@dataclass
class Exercise:
    """
    Main Aggregate in esercising domin
    """

    id: int
    title: str
    description: str
