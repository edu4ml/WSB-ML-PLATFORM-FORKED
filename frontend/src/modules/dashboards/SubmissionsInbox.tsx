import { Card, Table, Dropdown, Typography, Tag, Space } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import UserCardAvatar from '../common/UserCardAvatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIssueCommandMutation } from '../../features/courses/coursesApi';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const submissionStatusTagColor = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'warning',
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'success',
    [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'error',
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'processing',
};

const SubmissionsInbox = ({ submissions }) => {
    const { t } = useTranslation();
    const [issueCommand, {}] = useIssueCommandMutation();

    const submissionStatusTagText = {
        [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: t('Waiting'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: t('Passed'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: t('Failed'),
        [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: t('Submitted'),
    };

    const menu = (submission) => [
        {
            key: 'download',
            label: t('Download'),
            onClick: (record) => {
                console.log('Download', record);
            },
        },
        {
            key: 'approve',
            label: t('Approve'),
            onClick: () => {
                issueCommand({
                    id: submission.uuid,
                    command: {
                        type: Enums.COMMAND_TYPES.APPROVE_SUBMISSION,
                    },
                })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },
        {
            key: 'reject',
            label: t('Reject'),
            onClick: () => {
                issueCommand({
                    id: submission.uuid,
                    command: {
                        type: Enums.COMMAND_TYPES.REJECT_SUBMISSION,
                    },
                })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },
    ];

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
            dataIndex: '',
            key: 'action',
            width: '50',
            render: (_, record) => (
                <Dropdown
                    menu={{ items: menu(record) }}
                    trigger={['click', 'hover']}
                    placement="bottomRight"
                >
                    <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        <MoreVertIcon />
                    </a>
                </Dropdown>
            ),
        },
    ];

    return (
        <Card title={t('Submission Inbox')} bodyStyle={{ padding: 0 }}>
            <Table columns={columns} dataSource={submissions} rowKey={'uuid'} />
        </Card>
    );
};

export default SubmissionsInbox;
