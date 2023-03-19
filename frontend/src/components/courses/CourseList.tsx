import React from 'react';
import { List } from 'antd';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import CourseListItem from './CourseListItem';

interface CourseListItem {
    uuid: string;
    title: string;
    description: string;
    progress: number;
    is_enrolled: boolean;
    is_draft: boolean;
}

const CourseList = ({ courses }) => {
    const { data: userData } = useGetUserProfileQuery('userDetails');

    return (
        <List
            itemLayout="vertical"
            size={'large'}
            pagination={{ pageSize: 10 }}
            dataSource={courses}
            renderItem={(course: CourseListItem) => (
                <CourseListItem course={course} user={userData} />
            )}
        />
    );
};

export default CourseList;
