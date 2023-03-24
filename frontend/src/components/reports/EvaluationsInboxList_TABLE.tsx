import { Button, Collapse, List, Space, Table, Typography } from 'antd';
import React from 'react';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { UserOutlined } from '@ant-design/icons';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const { Text } = Typography;

const EvaluationsInboxList = ({ evaluations }) => {
    const courseEvaluationInboxes = (courseEvaluations) => {
        let totalEvaluations = 0;
        for (const student of courseEvaluations.students) {
            totalEvaluations += student.evaluations.length;
        }
        return totalEvaluations;
    };

    return (
        <Collapse>
            {evaluations?.map((courseEvaluations) => (
                <Collapse.Panel
                    extra={
                        <Space>
                            <MailOutlinedIcon />
                            {courseEvaluationInboxes(courseEvaluations)}
                        </Space>
                    }
                    key={courseEvaluations.title}
                    header={<Text strong>{courseEvaluations.title}</Text>}
                    collapsible={
                        courseEvaluationInboxes(courseEvaluations)
                            ? undefined
                            : 'disabled'
                    }
                >
                    <List
                        bordered
                        dataSource={courseEvaluations.students}
                        renderItem={(student) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Space
                                            direction="vertical"
                                            style={{ width: '100%' }}
                                        >
                                            <Space
                                                direction="horizontal"
                                                style={{ width: '100%' }}
                                            >
                                                <UserOutlined />
                                                {student.email}
                                            </Space>
                                            <List
                                                dataSource={student.evaluations}
                                                renderItem={(evaluation) => {
                                                    return (
                                                        <List.Item
                                                            actions={[
                                                                <Button
                                                                    type="text"
                                                                    onClick={() => {
                                                                        console.log(
                                                                            'Clicked: ',
                                                                            evaluation
                                                                        );
                                                                    }}
                                                                >
                                                                    <DoneAllIcon />
                                                                </Button>,
                                                            ]}
                                                        >
                                                            {evaluation.title}
                                                        </List.Item>
                                                    );
                                                }}
                                            />
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )}
                    ></List>
                </Collapse.Panel>
            ))}
        </Collapse>
    );
};

export default EvaluationsInboxList;
