import type { ButtonType } from 'antd/es/button/buttonHelpers';

interface CourseListItemType {
    uuid: string;
    title: string;
    description: string;
    progress: number;
    is_enrolled: boolean;
    is_draft: boolean;
    updated_at: string;
    created_at: string;
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

interface CardHeaderRightButtonActionType {
    text: string;
    onClick;
    type: ButtonType;
    dataCy: string;
}

export {
    CourseListItemType,
    UserType,
    CourseComponentItemType,
    CourseStepItemType,
    ResourceItemType,
    CourseItemDetailsType,
    ExerciseItemType,
    CardHeaderRightButtonActionType,
};
