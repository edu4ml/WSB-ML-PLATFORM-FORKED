import { Space } from 'antd';
import React from 'react';
import { useGetTeacherReportQuery } from '../../features/reports/reportsApi';
import PageHeader from '../../components/common/PageHeader';
import SubmissionsInbox from './SubmissionsInbox';
import CoursesProgress from './CoursesProgress';
import { useGetUserProfileQuery } from '../../features/auth/authApi';

const DashboardPage = () => {
    const { data: userData } = useGetUserProfileQuery('userDetails');
    const { data: report } = useGetTeacherReportQuery('teacher-report');

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <PageHeader
                title={`👋 ${
                    userData.first_name ? userData.first_name : userData.email
                }`}
                actions={[]}
            />
            <SubmissionsInbox submissions={report?.submissions} />
            <CoursesProgress courses={report?.courses} />
        </Space>
    );
};

export default DashboardPage;
