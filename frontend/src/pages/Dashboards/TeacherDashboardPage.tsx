import { Card, Space } from 'antd';
import React from 'react';
import CoursesProgressList from '../../components/reports/CoursesProgressList';
import { useGetTeacherReportQuery } from '../../features/reports/reportsApi';

const TeacherDashboardPage = () => {
    const { data: report, isSuccess } =
        useGetTeacherReportQuery('teacher-report');

    return isSuccess ? (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Card title={'Progress studentów w kursach'} bordered>
                <CoursesProgressList courses={report.courses} />
            </Card>
        </Space>
    ) : (
        <div></div>
    );
};

export default TeacherDashboardPage;
