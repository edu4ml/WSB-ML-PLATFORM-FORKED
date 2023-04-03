import { Space } from 'antd';
import React from 'react';
import { useGetTeacherReportQuery } from '../../features/reports/reportsApi';
import PageHeader from '../../components/common/PageHeader';
import SubmissionsInbox from './SubmissionsInbox';

const DashboardPage = () => {
    const { data: report, isSuccess } =
        useGetTeacherReportQuery('teacher-report');

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <PageHeader title={'👋 {Imie}'} actions={[]} />
            <SubmissionsInbox submissions={report?.submissions} />
        </Space>
    );
};

export default DashboardPage;
