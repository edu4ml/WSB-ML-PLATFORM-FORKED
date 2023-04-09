import { Card, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../common/PageTitle';
import { useTranslation } from 'react-i18next';
import getActions from '../actions/componentListActions';
import ComponentsList from '../components/componentsList';
import { useGetComponentListQuery } from '../../../features/courses/coursesApi';
import { ComponentType } from '../../../types/course';

const ComponentsDashboard = () => {
    const { t } = useTranslation();
    const { data: components } = useGetComponentListQuery('course-components');

    const [activeTabKey, setActiveTabKey] = useState<string>('EXERCISE');
    const [filteredResource, setFilteredResource] = useState<
        Array<ComponentType>
    >([]);

    const tabList = [
        {
            key: 'EXERCISE',
            tab: t('Exercises') as String,
        },
        {
            key: 'EVALUATION',
            tab: t('Evaluations') as String,
        },
    ];

    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };

    const sortComponents = (components) => {
        if (!Array.isArray(components)) return [];
        const mutableComponents = [...components];
        return mutableComponents.sort((a, b) => {
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
        });
    };

    useEffect(() => {
        setFilteredResource(
            sortComponents(components).filter((c) => c.type === activeTabKey)
        );
    }, [activeTabKey, components]);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageTitle
                title={t('Course Dashboard') as String}
                actions={getActions()}
            />
            <Card
                style={{
                    backgroundColor: 'rgb(0,0,0,0)',
                    boxShadow: '0px 0px',
                }}
                bordered={false}
                bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
                tabList={tabList}
                onTabChange={onTabChange}
                activeTabKey={activeTabKey}
            >
                <ComponentsList components={filteredResource} />
            </Card>
        </Space>
    );
};

export default ComponentsDashboard;
