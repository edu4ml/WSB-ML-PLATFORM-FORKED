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

interface CourseStepItemType {
    uuid: number;
    title: string;
    description: string;
    is_draft: boolean;
    user_progress: {
        tracking_uuid: number;
        is_completed: boolean;
        is_blocked: boolean;
    };
    order: number;
    resources: Array<ResourceItemType>;
    content_type: string;
    evaluation_type: string | null;
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
    CourseStepItemType,
    ResourceItemType,
    CourseItemDetailsType,
    ExerciseItemType,
    CardHeaderRightButtonActionType,
};
