import React, { useState } from 'react';
import { Card } from 'antd';
import ExerciseList from '../../components/exercises/ExerciseList';
import CardHeader from '../../components/common/CardHeader';
import { useGetCourseComponentsQuery } from '../../features/courses/coursesApi';

const tabList = [
    {
        key: 'exercises',
        tab: 'Ćwiczenia',
    },
    {
        key: 'evaluations',
        tab: 'Testy',
    },
];

const ExercisesPage = () => {
    const { data: courseComponents } =
        useGetCourseComponentsQuery('course-components');
    const [activeTabKey, setActiveTabKey] = useState<string>('exercises');

    const cardContentList: Record<string, React.ReactNode> = {
        exercises: <ExerciseList exercises={courseComponents} />,
    };
    return (
        <Card
            title={<CardHeader title={''} actions={[]} />}
            bordered={false}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={setActiveTabKey}
        >
            {cardContentList[activeTabKey]}
        </Card>
    );
};

export default ExercisesPage;
