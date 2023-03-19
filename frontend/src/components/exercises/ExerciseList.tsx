import { Col, List, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ExerciseItemType } from '../../types/course';

const ExerciseList = ({
    exercises,
}: {
    exercises: Array<ExerciseItemType>;
}) => {
    return (
        <List
            itemLayout="vertical"
            size={'large'}
            pagination={{ pageSize: 10 }}
            dataSource={exercises}
            renderItem={(exercise: ExerciseItemType) => {
                return (
                    <List.Item key={exercise.title}>
                        <List.Item.Meta
                            title={
                                <Row>
                                    <Link to={`/exercises/${exercise.uuid}`}>
                                        {exercise.title}
                                    </Link>
                                </Row>
                            }
                            description={exercise.description}
                        />
                    </List.Item>
                );
            }}
        />
    );
};

export default ExerciseList;
