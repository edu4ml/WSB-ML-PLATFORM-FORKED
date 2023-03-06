import React from 'react';
import { Card, Col, List, Row, Table, Tag, Typography } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import ExerciseSelfEvaluateButton from './ExerciseSelfEvaluate';

const { Text } = Typography;

interface ExerciseItem {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    is_blocked: boolean;
    exercises;
}

const getStatusTag = (row: ExerciseItem) => {
    const tagStyle: React.CSSProperties = {
        float: 'right',
    };

    if (row.is_completed && !row.is_blocked) {
        return (
            <span>
                <Tag style={tagStyle} color="green">
                    {'Ukończono'}
                </Tag>
            </span>
        );
    } else if (!row.is_completed && !row.is_blocked) {
        return (
            <span>
                <Tag style={tagStyle} color="geekblue">
                    {'W trakcie'}
                </Tag>
            </span>
        );
    } else {
        return (
            <span>
                <Tag style={tagStyle} color="volcano">
                    {'Zablokowany'}
                </Tag>
            </span>
        );
    }
};

const titleAndDescriptionCell = (row: ExerciseItem) => {
    const titleType = row.is_blocked ? 'secondary' : undefined;
    return (
        <List.Item.Meta
            title={
                <Row>
                    <Col span={16}>
                        <Text type={titleType}>{row.title}</Text>
                    </Col>
                    <Col span={8}>{getStatusTag(row)}</Col>
                </Row>
            }
            description={
                <Text disabled={row.is_blocked}>{row.description}</Text>
            }
        />
    );
};

const columns = [
    { title: 'Ćwiczenie', key: 'title', render: titleAndDescriptionCell },
];

const expandedRowRender = ({ id, resources, is_self_evaluated }) => {
    const resourcesColumns = [
        { title: 'Resource', dataIndex: 'description', key: 'resource' },
        { title: 'Url', dataIndex: 'url', key: 'url' },
    ];

    const requirementsColumns = [
        { title: 'Type', dataIndex: 'type', key: 'type' },
        {
            title: 'passed',
            dataIndex: 'passed',
            key: 'passed',
            render: (value) => {
                if (value) {
                    return <CheckCircleTwoTone twoToneColor="#b7eb8f" />;
                } else {
                    return <ClockCircleTwoTone />;
                }
            },
        },
    ];

    return (
        <Table
            rowKey="url"
            columns={resourcesColumns}
            dataSource={resources}
            pagination={false}
            footer={() => {
                if (is_self_evaluated) {
                    return <ExerciseSelfEvaluateButton exercise_id={id} />;
                }
            }}
        />
    );
};

const rowExpandable = (record) => {
    return !record.is_blocked;
};

const ExerciseList = ({ title, exercises }) => {
    return (
        <Card title={title} bordered={false}>
            <Table
                showHeader={false}
                rowKey="id"
                columns={columns}
                expandable={{ expandedRowRender, rowExpandable }}
                dataSource={exercises}
            />
        </Card>
    );
};

export default ExerciseList;
