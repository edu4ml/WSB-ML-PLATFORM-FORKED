import { Space } from 'antd';
import React from 'react';
import { useGetTeacherReportQuery } from '../features/reports/reportsApi';
import { useUserProfileQuery } from '../features/auth/authApi';
import PageTitle from '../modules/common/PageTitle';
import { SubmissionInbox, StudentsProgress } from '../modules';

const DashboardPage = () => {
    const { data: userData } = useUserProfileQuery('userDetails');
    const { data: report } = useGetTeacherReportQuery('teacher-report');

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <PageTitle
                title={`👋 ${
                    userData.first_name ? userData.first_name : userData.email
                }`}
                actions={[]}
            />
            <SubmissionInbox submissions={report?.submissions} />
            <StudentsProgress courses={report?.courses} />
        </Space>
    );
};

export default DashboardPage;
