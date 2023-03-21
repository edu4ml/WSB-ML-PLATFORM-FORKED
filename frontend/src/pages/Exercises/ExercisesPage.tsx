import React, { useState } from 'react';
import { Card } from 'antd';
import ExerciseList from '../../components/exercises/ExerciseList';
import { useGetExercisesCatalogQuery } from '../../features/exercises/exerciseApi';
import CardHeader from '../../components/common/CardHeader';

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
    const { data } = useGetExercisesCatalogQuery('exercise-catalog');
    const [activeTabKey, setActiveTabKey] = useState<string>('exercises');

    const cardContentList: Record<string, React.ReactNode> = {
        exercises: <ExerciseList exercises={data} />,
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
