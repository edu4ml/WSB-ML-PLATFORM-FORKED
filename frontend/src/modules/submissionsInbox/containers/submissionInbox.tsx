import { Card, Table, Dropdown, Typography, Tag, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';
import { Enums } from '../../../shared';
import UserCardAvatar from '../../common/UserCardAvatar';
import getMenuActions from '../actions/submissionActions';
import SubmissionDropdown from '../components/submissionActionsDropdown';

const { Text } = Typography;

const submissionStatusTagColor = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'warning',
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'success',
    [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'error',
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'processing',
};

const SubmissionsInbox = ({ submissions }) => {
    const { t } = useTranslation();

    const submissionStatusTagText = {
        [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: t('Waiting'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: t('Passed'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: t('Failed'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: t('Submitted'),
    };

    const columns = [
        {
            title: t('Student'),
            dataIndex: 'user',
            key: 'user',
            width: 300,
            render: (student) => <UserCardAvatar user={student} />,
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={submissionStatusTagColor[status]}>
                    {submissionStatusTagText[status]}
                </Tag>
            ),
        },
        {
            title: t('Submission'),
            key: 'submission',
            width: 600,
            render: (submission) => (
                <Card>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong>{submission.title}</Text>
                        <Text>{submission.description}</Text>
                    </Space>
                </Card>
            ),
        },
        {
            title: t('Component'),
            key: 'course_component',
            render: (submission) => (
                <Card hoverable>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong>{submission.course.title}</Text>
                        <Text>{submission.course_component.title}</Text>
                    </Space>
                </Card>
            ),
        },
        {
            title: '',
            key: 'action',
            width: '50',
            render: (submission) => {
                return <SubmissionDropdown submission={submission} />;
            },
        },
    ];

    return (
        <Card title={t('Submission Inbox')} bodyStyle={{ padding: 0 }}>
            <Table columns={columns} dataSource={submissions} rowKey={'uuid'} />
        </Card>
    );
};

export default SubmissionsInbox;
