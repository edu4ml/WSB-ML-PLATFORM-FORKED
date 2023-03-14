import { List } from 'antd';
import React from 'react';

interface ExerciseItem {
    id: number;
    title: string;
    description: string;
}

const ExerciseList = ({ exercises }) => {
    return (
        <List
            itemLayout="vertical"
            size={'large'}
            pagination={{ pageSize: 10 }}
            dataSource={exercises}
            renderItem={(item: ExerciseItem) => {
                return (
                    <List.Item key={item.title}>
                        <List.Item.Meta
                            title={
                                <a href={`/exercises/${item.id}`}>
                                    {item.title}
                                </a>
                            }
                            description={item.description}
                        />
                    </List.Item>
                );
            }}
        />
    );
};

export default ExerciseList;
