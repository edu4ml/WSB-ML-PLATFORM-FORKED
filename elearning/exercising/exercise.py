from dataclasses import dataclass


@dataclass
class Exercise:
    """
    Main Aggregate in esercising domin
    """

    title: str
    description: str
