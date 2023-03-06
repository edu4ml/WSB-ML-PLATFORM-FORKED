import { Card } from 'antd';
import React from 'react';
import CourseList from '../../components/courses/CourseList';
import { useGetCourseCatalogQuery } from '../../features/courses/coursesApi';

const CoursesPage = () => {
    const { data } = useGetCourseCatalogQuery('course-catalog');
    return (
        <Card title={'Twoje kursy'} bordered={false}>
            <CourseList courses={data} />
        </Card>
    );
};

export default CoursesPage;
