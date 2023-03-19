import { Col, List, Progress, Row } from 'antd';
import React from 'react';
import { CourseListItemType, UserType } from '../../types/course';
import CourseDetailsButton from '../common/CourseDetailsButton';
import CourseEnrollButton from '../common/CourseEnrollButton';
import CourseListItemHeader from '../common/CourseListItemHeader';

const CourseListItem = ({
    course,
    user,
}: {
    course: CourseListItemType;
    user: UserType;
}) => {
    const actions = (course: CourseListItemType) => {
        if (course.is_enrolled) {
            return [];
        } else {
            return [
                <CourseEnrollButton course={course} user={user} />,
                <CourseDetailsButton course={course} />,
            ];
        }
    };

    return (
        <List.Item key={course.title} actions={actions(course)}>
            <List.Item.Meta
                title={<CourseListItemHeader course={course} />}
                description={course.description}
            />
        </List.Item>
    );
};

export default CourseListItem;
