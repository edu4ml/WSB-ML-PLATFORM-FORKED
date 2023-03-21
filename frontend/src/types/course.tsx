import type { ButtonType } from 'antd/es/button/buttonHelpers';

interface CourseType {
    uuid: string;
    title: string;
    description: string;
    progress: number;
    is_enrolled: boolean;
    is_draft: boolean;
    updated_at: string;
    created_at: string;
}

interface CourseStepType {
    uuid: string;
    title: string;
    description: string;
    content_type: string;
    evaluation_type: string;
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
    CourseType,
    CourseStepType,
    ResourceItemType,
    ExerciseItemType,
    CardHeaderRightButtonActionType,
};
