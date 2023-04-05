import { Card, Table, Dropdown, Menu, Typography, Tag, Space } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import UserCardAvatar from '../../components/common/UserCardAvatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIssueSubmissionCommandMutation } from '../../features/courses/coursesApi';

const { Text } = Typography;

const submissionStatusTagColor = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'warning',
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'success',
    [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'error',
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'processing',
};

const submissionStatusTagText = {
    [Enums.COURSE_STEP_EVALUATION_STATUS.WAITING]: 'Oczekuje',
    [Enums.COURSE_STEP_EVALUATION_STATUS.PASSED]: 'Zatwierdzone',
    [Enums.COURSE_STEP_EVALUATION_STATUS.FAILED]: 'Odrzucone',
    [Enums.COURSE_STEP_EVALUATION_STATUS.SUBMITTED]: 'Przesłane',
};

const SubmissionsInbox = ({ submissions }) => {
    const [issueSubmissionCommand, {}] = useIssueSubmissionCommandMutation();

    const menu = (submission) => [
        {
            key: 'download',
            label: 'Pobierz',
            onClick: (record) => {
                console.log('Download', record);
            },
        },
        {
            key: 'approve',
            label: 'Zaakceptuj',
            onClick: () => {
                issueSubmissionCommand({
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
            label: 'Odrzuć',
            onClick: () => {
                issueSubmissionCommand({
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
            title: 'Student',
            dataIndex: 'user',
            key: 'user',
            width: 300,
            render: (student) => <UserCardAvatar user={student} />,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={submissionStatusTagColor[status]}>
                    {submissionStatusTagText[status]}
                </Tag>
            ),
        },
        {
            title: 'Wiadomość',
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
            title: 'Ćwiczenie',
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
        <Card title={'Prace do sprawdzenia'} bodyStyle={{ padding: 0 }}>
            <Table columns={columns} dataSource={submissions} rowKey={'uuid'} />
        </Card>
    );
};

export default SubmissionsInbox;
