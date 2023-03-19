import React from 'react';
import { useParams } from 'react-router';
import CourseDetails from '../../components/courses/CourseDetails';
import { useGetCourseQuery } from '../../features/courses/coursesApi';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const { data, isLoading } = useGetCourseQuery(courseId);

    if (!isLoading) {
        return <CourseDetails course={data} />;
    }
    return <div></div>;
};

export default CourseDetailPage;
