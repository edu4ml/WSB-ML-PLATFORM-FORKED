import { Enums } from '../shared';
import { CourseType } from '../types/course';
import { FileDoneOutlined, ReadOutlined } from '@ant-design/icons';
import React from 'react';
import { CATEGORY_OTHER_TEXTS } from '../texts';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const getCourseTitleComponent = (course, size) => {
    if (!course) {
        return '';
    }
    if (course.is_enrolled && !course.is_draft) {
        return (
            <Title level={size}>
                <Link
                    data-cy="course-catalog-list-item-link-title"
                    to={`/app/courses/${course.uuid}`}
                >
                    {course.title}
                </Link>
            </Title>
        );
    } else if (!course.is_enrolled && !course.is_draft) {
        return (
            <Title level={size}>
                <div data-cy="course-catalog-list-item-no-link-title">
                    {course.title}
                </div>
            </Title>
        );
    } else {
        return (
            <Title level={size}>
                <Link
                    data-cy="course-catalog-list-item-draft-title"
                    to={`/app/courses/${course.uuid}/edit`}
                    style={{ color: 'black' }}
                >
                    {course.title}
                    {'  '}
                    <Text type="secondary">{getCourseSubtitle(course)}</Text>
                </Link>
            </Title>
        );
    }
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
    getCourseTitleComponent,
    getCourseSubtitle,
    getContentTypeName,
    getContentTypeIcon,
};
