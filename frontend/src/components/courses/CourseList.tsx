import React from 'react';
import { List, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

interface CourseItem {
    title: string;
    logo: string;
    description: string;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const CourseList = ({ courses }) => (
    <List
        itemLayout="vertical"
        size={'large'}
        pagination={{ pageSize: 10 }}
        dataSource={courses}
        renderItem={(item: CourseItem) => (
            <List.Item
                key={item.title}
                actions={[
                    <IconText
                        icon={StarOutlined}
                        text="Przejdź do kursu"
                        key=""
                    />,
                    <IconText
                        icon={LikeOutlined}
                        text="Przeglądnij repozytorium"
                        key=""
                    />,
                    <IconText
                        icon={MessageOutlined}
                        text="Zobacz wynik"
                        key=""
                    />,
                ]}
            >
                <List.Item.Meta
                    title={item.title}
                    description={item.description}
                />
                {/* <CourseListItem course={item} /> */}
            </List.Item>
        )}
    />
);

export default CourseList;
