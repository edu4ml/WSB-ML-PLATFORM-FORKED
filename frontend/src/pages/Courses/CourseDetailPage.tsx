import React from 'react';
import { useParams } from 'react-router';
import CourseItemsList from '../../components/courses/CourseItemsList';
import { useGetCourseQuery } from '../../features/courses/coursesApi';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const { data, isLoading } = useGetCourseQuery(courseId);

    if (!isLoading) {
        return <CourseItemsList data={data} />;
    }
    return <div>sada</div>;
};

export default CourseDetailPage;
