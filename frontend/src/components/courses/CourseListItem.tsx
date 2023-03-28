import { Card } from 'antd';
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
    const actions = (course: CourseType): React.ReactNode[] => {
        if (course.is_enrolled) {
            return [];
        } else if (course.is_draft) {
            return [<CourseDetailsButton key={'details'} course={course} />];
        } else if (!course.is_draft && !course.is_enrolled) {
            return [
                <CourseEnrollButton
                    key={'enroll'}
                    course={course}
                    user={user}
                />,
            ];
        }
        return [];
    };

    return (
        <Card
            data-cy={'course-catalog-list-item'}
            style={{ marginTop: '20px' }}
        >
            <Card.Meta
                title={
                    <CourseListItemHeader
                        course={course}
                        actions={actions(course)}
                    />
                }
                description={course.description}
            />
        </Card>
    );
};

export default CourseListItem;
