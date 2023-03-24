interface TeacherReport {
    courses: Array<ReportCourseType>;
}

interface ReportCourseType {
    title: string;
    students: Array<ReportCourseStudentType>;
}

interface ReportCourseStudentType {
    uuid: string;
    email: string;
    progress: ReportCourseStudentProgressType;
}

interface ReportCourseStudentProgressType {
    has_completed_course: boolean;
    current_step: number;
    steps: Array<ReportCourseStudentProgressStepsType>;
}

interface ReportCourseStudentProgressStepsType {
    title: string;
    order: number;
    completed_at: string;
    is_completed: boolean;
    evaluation_status: EvaluationStatusType;
}

interface EvaluationStatusType {
    title: string;
    description: string;
    status: string;
}

export {
    ReportCourseType,
    TeacherReport,
    ReportCourseStudentType,
    ReportCourseStudentProgressStepsType,
    ReportCourseStudentProgressType,
};
