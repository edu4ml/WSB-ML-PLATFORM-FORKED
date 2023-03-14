import React from 'react';
import { Card } from 'antd';
import ExerciseList from '../../components/exercises/ExerciseList';
import { useGetExercisesCatalogQuery } from '../../features/exercises/exerciseApi';

const ExercisesPage = () => {
    const { data } = useGetExercisesCatalogQuery('exercise-catalog');
    return (
        <Card title={'Ćwiczenia'} bordered={false}>
            <ExerciseList exercises={data} />
        </Card>
    );
};

export default ExercisesPage;
