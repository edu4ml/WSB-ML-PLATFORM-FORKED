import React from 'react';
import { List } from 'antd';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import CourseListItem from './CourseListItem';
import { CourseListItemType } from '../../types/course';

function sortCourses(courses: Array<CourseListItemType>) {
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

const CourseList = ({ courses }) => {
    const { data: userData } = useGetUserProfileQuery('userDetails');

    const sortedCourses = sortCourses(courses);

    return (
        <List
            data-cy={'course-catalog-list'}
            itemLayout="vertical"
            size={'large'}
            pagination={{ pageSize: 10 }}
            dataSource={sortedCourses}
            renderItem={(course: CourseListItemType) => (
                <CourseListItem course={course} user={userData} />
            )}
        />
    );
};

export default CourseList;
