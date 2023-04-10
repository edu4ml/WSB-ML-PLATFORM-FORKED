import React from 'react';
import { CourseType } from '../../../types/course';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const CourseTitle = ({ course, size }: { course: CourseType; size }) => {
    const { t } = useTranslation();
    const draftAdd = course?.is_draft ? t('draft version') : '';

    if (!course) {
        return <Title></Title>;
    }
    if (course?.is_enrolled && !course.is_draft) {
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
                    <Text type="secondary">{draftAdd}</Text>
                </Link>
            </Title>
        );
    }
};

export default CourseTitle;
