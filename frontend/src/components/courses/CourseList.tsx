import React from 'react';
import { Button, Col, Form, Input, List, Progress, Row, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { useEnrollForCourseMutation } from '../../features/courses/coursesApi';

interface CourseItem {
    id: number;
    title: string;
    logo: string;
    description: string;
    progress: number;
    is_enrolled: boolean;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const CourseActions = (courseItem: CourseItem, enrollFunc) => {
    if (courseItem.is_enrolled) {
        return [
            <IconText icon={StarOutlined} text="Przejdź do kursu" key="" />,
            <IconText
                icon={LikeOutlined}
                text="Przeglądnij repozytorium"
                key=""
            />,
            <IconText icon={MessageOutlined} text="Zobacz wynik" key="" />,
        ];
    } else {
        return [
            <Form name="enrollCourse" onFinish={enrollFunc}>
                <Form.Item
                    label="courseId"
                    name="courseId"
                    initialValue={courseItem.id}
                    hidden
                >
                    <Input value={courseItem.id} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" style={{ width: '100%' }}>
                        Dołącz do kursu
                    </Button>
                </Form.Item>
            </Form>,
        ];
    }
};

const CourseList = ({ courses }) => {
    const [enrollUser, data] = useEnrollForCourseMutation();

    return (
        <List
            itemLayout="vertical"
            size={'large'}
            pagination={{ pageSize: 10 }}
            dataSource={courses}
            renderItem={(item: CourseItem) => {
                const titleWithProgress = (item: CourseItem) => (
                    <Row>
                        <Col span={16}>{item.title}</Col>
                        <Col span={8}>
                            {item.is_enrolled && (
                                <Progress percent={item.progress} />
                            )}
                        </Col>
                    </Row>
                );

                return (
                    <List.Item
                        key={item.title}
                        actions={CourseActions(item, enrollUser)}
                    >
                        <List.Item.Meta
                            title={titleWithProgress(item)}
                            description={item.description}
                        />
                    </List.Item>
                );
            }}
        />
    );
};

export default CourseList;
