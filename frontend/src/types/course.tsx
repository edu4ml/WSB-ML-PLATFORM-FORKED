import type { ButtonType } from 'antd/es/button/buttonHelpers';

export type CourseType = {
    uuid: string;
    updated_at: string;
    created_at: string;
    author: string;
    is_enrolled: boolean;
    title: string;
    description: string;
    progress: number;
    is_draft: boolean;
    steps: Array<CourseStepType>;
};

// --------------------------------------
export interface CourseStepType {
    order: number;
    evaluation_type: string;
    component: ComponentType;
    user_progress: CourseStepUserProgressType | null;
}
export interface ComponentType {
    uuid: string;
    title: string;
    description: string;
    type: string;
    resources: Array<ResourceItemType>;
}

export interface CourseStepUserProgressType {
    tracking_uuid: string;
    completed_at: string;
    is_completed: boolean;
    is_blocked: boolean;
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

export { ResourceItemType, ExerciseItemType, CardHeaderRightButtonActionType };
