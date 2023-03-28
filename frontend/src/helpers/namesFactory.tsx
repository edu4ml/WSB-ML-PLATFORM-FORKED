import { Enums } from '../shared';
import {
    TEXT_DRAFT_VERSION,
    TEXT_EXERCISES,
    TEXT_VERIFICATION,
} from '../texts';
import { CourseType } from '../types/course';
import {
    DownOutlined,
    FileDoneOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import React from 'react';

const getCourseTitle = (course: CourseType) => {
    if (course) {
        return course.title;
    }
    return '';
};

const getCourseSubtitle = (course: CourseType) => {
    if (course && course.is_draft) {
        return TEXT_DRAFT_VERSION;
    }
    return '';
};

const getContentTypeName = (contentType: string) => {
    const contentTypeToGroupTitleMap = {
        [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: TEXT_EXERCISES,
        [Enums.COURSE_COMPONENT_TYPE.EVALUATION]: TEXT_VERIFICATION,
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
