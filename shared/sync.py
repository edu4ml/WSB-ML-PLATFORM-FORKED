import json

from shared.enums import (
    CommandTypes,
    CourseStepEvaluationStatus,
    CourseComponentType,
    CourseStepEvaluationType,
    UserRoles,
)


def export_to_json(objs, file_name):
    data = dict()
    for obj in objs:
        if obj._PREFIX not in data.keys():
            data[obj._PREFIX] = dict()

        for key, value in vars(obj).items():
            if not key.startswith("_") and not key.startswith("choices"):
                data[obj._PREFIX][key] = value

    with open(file_name, "w") as f:
        json.dump(
            data,
            f,
            indent=2,
        )


if __name__ == "__main__":
    export_to_json(
        [
            CommandTypes,
            UserRoles,
            CourseStepEvaluationType,
            CourseStepEvaluationStatus,
            CourseComponentType,
        ],
        "shared/enums.json",
    )
