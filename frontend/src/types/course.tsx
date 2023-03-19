interface CourseListItemType {
    uuid: string;
    title: string;
    description: string;
    progress: number;
    is_enrolled: boolean;
    is_draft: boolean;
}

interface CourseItemDetailsType {
    uuid: string;
    title: string;
    description: string;
    current_active: number;
    steps: Array<CourseStepItemType>;
}

interface UserType {
    pk: string;
}

interface CourseComponentItemType {
    uuid: string;
    title: string;
    description: string;
    content_type: string;
}

interface CourseStepItemType {
    uuid: number;
    title: string;
    description: string;
    is_self_evaluated: boolean;
    is_draft: boolean;
    user_progress: {
        tracking_uuid: number;
        is_completed: boolean;
        is_blocked: boolean;
    };
    order: number;
    resources: Array<ResourceItemType>;
}

interface ResourceItemType {
    title: string;
    url: string;
}

interface ExerciseItemType {
    uuid: number;
    title: string;
    description: string;
    resources: Array<ResourceItemType>;
}

export {
    CourseListItemType,
    UserType,
    CourseComponentItemType,
    CourseStepItemType,
    ResourceItemType,
    CourseItemDetailsType,
    ExerciseItemType,
};
