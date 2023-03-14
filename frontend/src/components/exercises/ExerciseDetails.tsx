import { Card } from 'antd';
import React from 'react';

const ExerciseDetails = ({ exercise }) => {
    return (
        <Card title={exercise.title} bordered={true}>
            <span>{exercise.description}</span>
        </Card>
    );
};

export default ExerciseDetails;
