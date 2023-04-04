from enum import Enum


class CommandTypes:
    _PREFIX = "COMMAND_TYPES"

    CREATE_COURSE = "CREATE_COURSE"
    ENROLL_FOR_COURSE = "ENROLL_FOR_COURSE"
    COMPLETE_COURSE_STEP = "COMPLETE_COURSE_STEP"
    UPDATE_COURSE = "UPDATE_COURSE"

    SUBMIT_SUBMISSION = "SUBMIT_SUBMISSION"
    APPROVE_SUBMISSION = "APPROVE_SUBMISSION"
    REJECT_SUBMISSION = "REJECT_SUBMISSION"


class CourseComponentType(str, Enum):
    """
    Indicate what component type is used in course step

    - OTHER: for any other type
    - EXERCISE: for exercise type. This is meant to be used to create a piece of course where student can practice
    - EVALUATION: for evaluation type. This is meant to be used for evaluation only. Some test to pass etc.
    """

    _PREFIX = "COURSE_COMPONENT_TYPE"

    OTHER = "OTHER"
    EXERCISE = "EXERCISE"
    EVALUATION = "EVALUATION"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls if item.name != "_PREFIX"]


class CourseStepEvaluationType(str, Enum):
    """
    Indicate the strategy for evaluating course step.
    Every course step must have an evaluation type. It can be self evaluated, teacher evaluated, file evaluated etc.
    - FILE_EVALUATED: sending a file is enough to pass the course step
    - TEACHER_EVALUATED: teacher must approve the course step
    - TEST_EVALUATED: test must be passed to pass the course step
    """

    _PREFIX = "COURSE_STEP_EVALUATION_TYPE"

    SELF_EVALUATED = "SELF_EVALUATED"
    FILE_EVALUATED = "FILE_EVALUATED"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls if item.name != "_PREFIX"]


class CourseStepEvaluationStatus(str, Enum):
    """
    Indicate the status of course step evaluation
    - WAITING: waiting for evaluation to be submitted
    - SUBMITTED: evaluation is submitted
    - PASSED: evaluation is passed
    """

    _PREFIX = "COURSE_STEP_EVALUATION_STATUS"

    WAITING = "WAITING"
    SUBMITTED = "SUBMITTED"
    FAILED = "FAILED"
    PASSED = "PASSED"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls if item.name != "_PREFIX"]


class CourseStepUserProgressStatus(str, Enum):
    """
    Indicate the status of course step for a user (if it is completed or not, blocked or not etc.)
    """

    _PREFIX = "COURSE_STEP_USER_PROGRESS_STATUS"

    BLOCKED = "BLOCKED"
    AVAILABLE = "AVAILABLE"
    COMPLETED = "COMPLETED"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls if item.name != "_PREFIX"]


class UserRoles:
    _PREFIX = "USER_ROLES"

    ADMIN = "admin"  # this is superuser like role
    TEACHER = "teacher"
    STUDENT = "student"


class ApiErrors:
    _PREFIX = "API_ERRORS"

    USER_DOES_NOT_EXIST = "USER_DOES_NOT_EXIST"
    HANDLER_DOES_NOT_EXITS = "NOT_IMPLEMENTED"
    COMMAND_TYPE_NOT_SUPPORTED = "COMMAND_TYPE_NOT_SUPPORTED"
    COMMAND_TYPE_HAS_NO_PARENT = "COMMAND_TYPE_HAS_NO_PARENT"
    CANNOT_ENROLL_FOR_COURSE = "CANNOT_ENROLL_FOR_COURSE"
    CANNOT_ENROLL_FOR_COURSE_ALREADY_ENROLLED = (
        "CANNOT_ENROLL_FOR_COURSE_ALREADY_ENROLLED"
    )
    CANNOT_ENROLL_FOR_COURSE_IN_DRAFT = "CANNOT_ENROLL_FOR_COURSE_IN_DRAFT"
    CANNOT_UPDATE_COURSE_NOT_AUTHOR = "CANNOT_UPDATE_COURSE_NOT_AUTHOR"
    CANNOT_UPDATE_PUBLISHED_COURSE = "CANNOT_UPDATE_PUBLISHED_COURSE"
    CANNOT_UPDATE_COURSE_STEP_WITHOUT_COMPONENT = (
        "CANNOT_UPDATE_COURSE_STEP_WITHOUT_COMPONENT"
    )
    CANNOT_UPDATE_COURSE_STEP_WITHOUT_EVALUATION_TYPE = (
        "CANNOT_UPDATE_COURSE_STEP_WITHOUT_EVALUATION_TYPE"
    )
    CANNOT_UPDATE_COURSE_STEP_WITHOUT_ORDER = "CANNOT_UPDATE_COURSE_STEP_WITHOUT_ORDER"
    COURSE_DOES_NOT_EXIST = "COURSE_DOES_NOT_EXIST"
    CANNOT_CREATE_COURSE_WITHOUT_TITLE = "CANNOT_CREATE_COURSE_WITHOUT_TITLE"
