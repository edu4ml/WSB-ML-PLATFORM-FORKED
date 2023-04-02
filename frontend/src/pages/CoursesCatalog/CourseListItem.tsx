import { Card, Progress, Typography } from 'antd';
import React from 'react';
import { CourseType } from '../../types/course';
import { UserType } from '../../types/user';
import CourseDetailsButton from '../../components/common/CourseDetailsButton';
import CourseEnrollButton from '../../components/common/CourseEnrollButton';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const getCourseExtra = (course, user) => {
    if (course.is_enrolled && !course.is_draft) {
        return (
            <Progress
                style={{ width: '400px' }}
                data-cy="course-catalog-list-item-progress"
                percent={course.progress}
            />
        );
    } else if (!course.is_enrolled && !course.is_draft) {
        return (
            <CourseEnrollButton key={'enroll'} course={course} user={user} />
        );
    } else {
        return <CourseDetailsButton key={'details'} course={course} />;
    }
};

const getCourseTitle = (course) => {
    if (course.is_enrolled && !course.is_draft) {
        return (
            <Link
                data-cy="course-catalog-list-item-link-title"
                to={`/app/courses/${course.uuid}`}
            >
                {course.title}
            </Link>
        );
    } else if (!course.is_enrolled && !course.is_draft) {
        return (
            <div data-cy="course-catalog-list-item-no-link-title">
                {course.title}
            </div>
        );
    } else {
        return (
            <Link
                data-cy="course-catalog-list-item-draft-title"
                to={`/app/courses/${course.uuid}/edit`}
            >
                {course.title}
            </Link>
        );
    }
};

const CourseListItem = ({
    course,
    user,
}: {
    course: CourseType;
    user: UserType;
}) => {
    return (
        <Card
            data-cy={'course-catalog-list-item'}
            style={{ marginTop: '20px' }}
            title={<Title level={4}>{getCourseTitle(course)}</Title>}
            extra={getCourseExtra(course, user)}
        >
            description={course.description}
        </Card>
    );
};

export default CourseListItem;
