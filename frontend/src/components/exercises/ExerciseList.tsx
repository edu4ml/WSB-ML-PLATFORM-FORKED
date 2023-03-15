import { Col, List, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

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
                                <Row>
                                    <Link to={`/exercises/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </Row>
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
