import { List } from 'antd';
import React from 'react';
import { CourseType } from '../../types/course';
import { UserType } from '../../types/user';
import CourseDetailsButton from '../common/CourseDetailsButton';
import CourseEnrollButton from '../common/CourseEnrollButton';
import CourseListItemHeader from '../common/CourseListItemHeader';

const CourseListItem = ({
    course,
    user,
}: {
    course: CourseType;
    user: UserType;
}) => {
    const actions = (course: CourseType) => {
        if (course.is_enrolled) {
            return [];
        } else if (course.is_draft) {
            return [<CourseDetailsButton course={course} />];
        } else if (!course.is_draft && !course.is_enrolled) {
            return [<CourseEnrollButton course={course} user={user} />];
        }
    };

    return (
        <List.Item
            key={course.title}
            actions={actions(course)}
            data-cy={'course-catalog-list-item'}
            className={'course-list-item'}
        >
            <List.Item.Meta
                title={<CourseListItemHeader course={course} />}
                description={course.description}
            />
        </List.Item>
    );
};

export default CourseListItem;
