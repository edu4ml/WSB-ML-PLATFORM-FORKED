import { Card, Progress } from 'antd';
import React from 'react';
import { CourseType } from '../../types/course';
import { UserType } from '../../types/user';
import {
    CourseDetailsButton,
    CourseEnrollButton,
} from './CourseListItemActions';
import { getCourseTitleComponent } from '../../helpers/namesFactory';

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
            title={getCourseTitleComponent(course, 4)}
            extra={getCourseExtra(course, user)}
        >
            {course.description}
        </Card>
    );
};

export default CourseListItem;
