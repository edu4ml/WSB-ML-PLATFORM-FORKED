import React from 'react';
import { Card, List } from 'antd';
import { UserType } from '../../../types/user';
import { CourseType } from '../../../types/course';
import getActions from '../actions/courseItemActions';
import { getCourseTitleComponent } from '../../../helpers/namesFactory';

function sortCourses(courses: Array<CourseType>) {
    // 1. If Course A is enrolled and Course B is not, Course A comes first.
    // 2. If Course A is not enrolled and Course B is, Course B comes first.
    // 3. If Course A is not a draft and Course B is a draft, Course A comes first.
    // 4. If Course A is a draft and Course B is not, Course B comes first.
    // 5. If both courses have the same enrollment and draft status, compare their `updated_at` dates:
    //    - The course with the more recent `updated_at` date comes first.

    if (!Array.isArray(courses)) {
        return undefined;
    }
    const mutableCourses = [...courses];
    return mutableCourses.sort((a, b) => {
        if (a.is_enrolled && !b.is_enrolled) {
            return -1;
        } else if (!a.is_enrolled && b.is_enrolled) {
            return 1;
        } else if (!a.is_draft && b.is_draft) {
            return -1;
        } else if (a.is_draft && !b.is_draft) {
            return 1;
        } else {
            return (
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            );
        }
    });
}

const CourseList = ({
    courses,
    user,
}: {
    courses: Array<CourseType>;
    user: UserType;
}) => {
    const sortedCourses = sortCourses(courses);

    return (
        <List
            bordered={false}
            data-cy={'course-catalog-list'}
            size={'large'}
            pagination={{ pageSize: 10 }}
            dataSource={sortedCourses}
            renderItem={(course: CourseType) => (
                <Card
                    data-cy={'course-list-item'}
                    style={{ marginTop: '20px' }}
                    title={getCourseTitleComponent(course, 4)}
                    extra={getActions(course, user)}
                >
                    {course.description}
                </Card>
            )}
        />
    );
};

export default CourseList;
