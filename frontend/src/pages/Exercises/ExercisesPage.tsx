import React from 'react';
import { Card } from 'antd';
import ExerciseList from '../../components/exercises/ExerciseList';
import { useGetExercisesCatalogQuery } from '../../features/exercises/exerciseApi';
import CardHeader from '../../components/common/CardHeader';

const ExercisesPage = () => {
    const { data } = useGetExercisesCatalogQuery('exercise-catalog');
    return (
        <Card
            title={<CardHeader title={'Ćwiczenia'} actions={[]} />}
            bordered={false}
        >
            <ExerciseList exercises={data} />
        </Card>
    );
};

export default ExercisesPage;
