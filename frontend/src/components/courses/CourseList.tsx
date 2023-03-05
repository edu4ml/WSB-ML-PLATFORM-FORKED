import React from 'react';
import { Button, Col, List, Progress, Row, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

interface CourseItem {
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

const EnrollButton = (item: CourseItem) => <Button>Dołącz do kursu!</Button>;

const CourseActions = (item: CourseItem) => {
    if (item.is_enrolled) {
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
        return [<Button style={{ width: '100%' }}>Dołącz do kursu</Button>];
    }
};

const CourseList = ({ courses }) => (
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
                <List.Item key={item.title} actions={CourseActions(item)}>
                    <List.Item.Meta
                        title={titleWithProgress(item)}
                        description={item.description}
                    />
                </List.Item>
            );
        }}
    />
);

export default CourseList;
