import React from 'react';
import CourseList from '../../components/courses/CourseList';
import { useGetCourseCatalogQuery } from '../../features/courses/coursesApi';

const CoursesPage = () => {
    const { data } = useGetCourseCatalogQuery('course-catalog');
    return <CourseList courses={data} />;
};

export default CoursesPage;
