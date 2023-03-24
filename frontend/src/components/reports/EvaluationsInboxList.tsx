import { Card, Space } from 'antd';
import React from 'react';
import { useGetTeacherReportQuery } from '../../features/reports/reportsApi';
import FileSubmissionCard from './evaluation/FileSubmittionCard';

const EvaluationsInboxList = () => {
    const { data: report, isSuccess } =
        useGetTeacherReportQuery('teacher-report');

    const getEvaluationInbox = (courses) => {
        let evaluationInbox = [];
        courses?.forEach((course) => {
            course.students.forEach((student) => {
                student.progress.steps.forEach((step) => {
                    if (step.evaluation_status.length > 0) {
                        step.evaluation_status.forEach((evaluation) => {
                            evaluationInbox.push({
                                course: {
                                    uuid: course.uuid,
                                    title: course.title,
                                },
                                student: {
                                    uuid: student.uuid,
                                    email: student.email,
                                },
                                status: evaluation.status,
                                title: evaluation.title,
                                description: evaluation.description,
                            });
                        });
                    }
                });
            });
        });
        return evaluationInbox;
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            {getEvaluationInbox(report?.courses).map((evaluationInboxItem) => (
                <FileSubmissionCard evaluation={evaluationInboxItem} />
            ))}
        </Space>
    );
};

export default EvaluationsInboxList;
