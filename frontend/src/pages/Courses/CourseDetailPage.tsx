import React from 'react';
import { useParams } from 'react-router';
import ExerciseList from '../../components/exercises/ExerciseList';
import { useGetCourseQuery } from '../../features/courses/coursesApi';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const { data, isLoading } = useGetCourseQuery(courseId);

    if (!isLoading) {
        return <ExerciseList exercises={data.exercises} />;
    }
    return <div>sada</div>;
};

export default CourseDetailPage;
