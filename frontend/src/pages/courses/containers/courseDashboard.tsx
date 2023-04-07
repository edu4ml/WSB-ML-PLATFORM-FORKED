import { Space } from 'antd';
import React from 'react';
import PageTitle from '../../common/PageTitle';

import { useTranslation } from 'react-i18next';
import { isTeacher } from '../../../helpers/permissions';
import { getActions } from '../actions/createNewCourseButton';
import { useUserProgileQuery } from '../../../features/auth/authApi';

const CourseDashboard = () => {
    const { t, i18n } = useTranslation();
    const { data: user } = useUserProgileQuery('userDetails');

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageTitle
                title={t('Course Dashboard')}
                actions={getActions(user)}
            />
            {/* <CourseList courses={courses} user={user} /> */}
        </Space>
    );
};

export default CourseDashboard;
