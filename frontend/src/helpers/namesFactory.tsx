import { Enums } from '../shared';
import { CourseType } from '../types/course';
import {
    DownOutlined,
    FileDoneOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import React from 'react';
import { CATEGORY_OTHER_TEXTS } from '../texts';

const getCourseTitle = (course: CourseType) => {
    if (course) {
        return course.title;
    }
    return '';
};

const getCourseSubtitle = (course: CourseType) => {
    if (course && course.is_draft) {
        return CATEGORY_OTHER_TEXTS.draftVersion;
    }
    return '';
};

const getContentTypeName = (contentType: string) => {
    const contentTypeToGroupTitleMap = {
        [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: CATEGORY_OTHER_TEXTS.exercises,
        [Enums.COURSE_COMPONENT_TYPE.EVALUATION]:
            CATEGORY_OTHER_TEXTS.verification,
    };

    return contentTypeToGroupTitleMap[contentType];
};

const getContentTypeIcon = (contentType: string) => {
    const contentTypeToIconMap = {
        [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: <ReadOutlined />,
        [Enums.COURSE_COMPONENT_TYPE.EVALUATION]: <FileDoneOutlined />,
    };
    return contentTypeToIconMap[contentType];
};

export {
    getCourseTitle,
    getCourseSubtitle,
    getContentTypeName,
    getContentTypeIcon,
};
