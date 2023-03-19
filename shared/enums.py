class CommandTypes:
    _PREFIX = "COMMAND_TYPES"

    CREATE_COURSE = "CREATE_COURSE"
    ENROLL_FOR_COURSE = "ENROLL_FOR_COURSE"
    COMPLETE_COURSE_STEP = "COMPLETE_COURSE_STEP"
    UPDATE_COURSE = "UPDATE_COURSE"


class CourseStepContentTypes:
    _PREFIX = "COURSE_STEP_CONTENT_TYPES"

    EXERCISE = "exercise"
    FILE_EVALUATION_TYPE = "fileevaluationtype"


class UserRoles:
    _PREFIX = "USER_ROLES"

    ADMIN = "admin"  # this is superuser like role
    TEACHER = "teacher"
    STUDENT = "student"
