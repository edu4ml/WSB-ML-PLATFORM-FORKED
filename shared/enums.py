from enum import Enum


class CommandTypes:
    _PREFIX = "COMMAND_TYPES"

    CREATE_COURSE = "CREATE_COURSE"
    ENROLL_FOR_COURSE = "ENROLL_FOR_COURSE"
    COMPLETE_COURSE_STEP = "COMPLETE_COURSE_STEP"
    UPDATE_COURSE = "UPDATE_COURSE"


class CourseStepComponentTypes(str, Enum):
    _PREFIX = "COURSE_STEP_COMPONENT_TYPES"

    UNKNOWN = "UNKNOWN"
    EXERCISE = "EXERCISE"
    FILE_EVALUATION = "FILE_EVALUATION"
    TEST_EVALUATION = "TEST_EVALUATION"
    TEACHER_EVALUATION = "TEACHER_EVALUATION"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls if item.name != "_PREFIX"]


class CourseStepEvaluationTypes(str, Enum):
    _PREFIX = "COURSE_STEP_EVALUATION_TYPES"

    SELF_EVALUATED = "SELF_EVALUATED"
    FILE_EVALUATED = "FILE_EVALUATED"
    TEST_EVALUATED = "TEST_EVALUATED"
    TEACHER_EVALUATED = "TEACHER_EVALUATED"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls if item.name != "_PREFIX"]


class CourseStepEvaluationStatus(str, Enum):
    _PREFIX = "COURSE_STEP_EVALUATION_STATUS"

    WAITING = "WAITING"
    SUBMITTED = "SUBMITTED"
    PASSED = "PASSED"
    SKIPPED = "SKIPPED"
    UNKNOWN = "UNKNOWN"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls if item.name != "_PREFIX"]


class UserRoles:
    _PREFIX = "USER_ROLES"

    ADMIN = "admin"  # this is superuser like role
    TEACHER = "teacher"
    STUDENT = "student"
