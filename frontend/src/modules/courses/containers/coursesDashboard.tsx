import { Space } from 'antd';
import React from 'react';
import PageTitle from '../../common/PageTitle';

import { useTranslation } from 'react-i18next';
import { getActions } from '../actions/courseListActions';
import { useUserProfileQuery } from '../../../features/auth/authApi';
import CourseList from '../components/courseList';
import { useGetCourseListQuery } from '../../../features/courses/coursesApi';

const CoursesDashboard = () => {
    const { t } = useTranslation();
    const { data: user } = useUserProfileQuery('userDetails');
    const { data: courses } = useGetCourseListQuery('course-catalog');

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageTitle
                title={t('Course Dashboard') as String}
                actions={getActions(user)}
            />
            <CourseList courses={courses} user={user} />
        </Space>
    );
};

export default CoursesDashboard;
