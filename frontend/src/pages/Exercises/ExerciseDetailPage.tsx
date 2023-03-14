import React from 'react';
import { useParams } from 'react-router';
import ExerciseDetails from '../../components/exercises/ExerciseDetails';
import { useGetExerciseQuery } from '../../features/exercises/exerciseApi';

const ExerciseDetailPage = () => {
    const { exerciseId } = useParams();
    const { data, isLoading } = useGetExerciseQuery(exerciseId);

    if (!isLoading) {
        return <ExerciseDetails exercise={data} />;
    }
    return <div></div>;
};

export default ExerciseDetailPage;
