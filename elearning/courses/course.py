from dataclasses import dataclass


@dataclass
class Course:
    """
    Main Aggregate in coursing domain
    """

    title: str
    description: str
    is_draft: bool

    is_enrolled: bool = False

    # def __init__(self, title: str, description: str, is_draft: bool) -> None:
    #     self.title = title
    #     self.description = description
    #     self.is_draft = is_draft

    def add_exercise(self):
        print("Exercise added!")
        # create new event ExerciseAddedToCourse
