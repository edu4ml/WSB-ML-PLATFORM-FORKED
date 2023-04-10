import {
    Card,
    Progress,
    Table,
    Collapse,
    Space,
    Typography,
    theme,
} from 'antd';
import React from 'react';
import UserCardAvatar from '../../common/UserCardAvatar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;
const { Text } = Typography;

const StudentTable = ({ students }) => {
    const columns = [
        {
            title: 'Student',
            dataIndex: ['student'],
            key: 'student',
            render: (student) => <UserCardAvatar user={student} />,
        },
        {
            title: 'Aktualne ćwiczenie',
            dataIndex: ['current_step', 'title'],
            key: 'current_step',
        },
        {
            key: 'progress',
            render: (student) => (
                <Progress
                    style={{ width: '400px', float: 'right' }}
                    data-cy="course-catalog-list-item-progress"
                    percent={student.progress}
                />
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={students}
            pagination={false}
            rowKey={'student'}
        />
    );
};

const StudentsProgress = ({ courses }) => {
    const { t } = useTranslation();
    const { token } = theme.useToken();

    const getPanelTitle = (course) => {
        return (
            <Space>
                <Text strong>{course.title}</Text>
                <Text type="secondary">{course.description}</Text>
            </Space>
        );
    };

    return (
        <Card title={'Teacher Dashboard'} bodyStyle={{ padding: 0 }}>
            <Collapse
                bordered={false}
                style={{ background: token.colorBgContainer }}
            >
                {courses?.map((course) => (
                    <Panel
                        header={getPanelTitle(course)}
                        key={course.title}
                        extra={
                            <Link
                                target="_blank"
                                to={`/app/courses/${course.uuid}`}
                            >
                                {t('course details')}
                            </Link>
                        }
                    >
                        <StudentTable students={course.students} />
                    </Panel>
                ))}
            </Collapse>
        </Card>
    );
};

export default StudentsProgress;
