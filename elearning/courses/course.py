from dataclasses import dataclass


@dataclass
class Course:
    title: str
    description: str
    is_draft: str

    # def __init__(self, title: str, description: str, is_draft: bool) -> None:
    #     self.title = title
    #     self.description = description
    #     self.is_draft = is_draft

    def add_exercise(self):
        print("Exercise added!")
        # create new event ExerciseAddedToCourse
