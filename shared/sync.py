import json
from shared.enums import CommandTypes


def export_to_json(obj, file_name):
    with open(file_name, "w") as f:
        json.dump(
            {
                f"{obj._PREFIX}__{key}": value
                for key, value in vars(obj).items()
                if not key.startswith("_")
            },
            f,
            indent=2,
        )


if __name__ == "__main__":
    export_to_json(CommandTypes, "enums.json")
