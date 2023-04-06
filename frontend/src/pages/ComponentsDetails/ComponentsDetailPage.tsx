import { Space } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import PageHeader from '../../components/common/PageHeader';
import { useGetComponentDetailsQuery } from '../../features/courses/coursesApi';
import ComponentDescription from './ComponentDescription';
import {
    ComponentFileResource,
    ComponentLinkResources,
} from './ComponentResources';

const ComponentDetailPage = () => {
    const { componentId } = useParams();
    const { data: component, isFetching } =
        useGetComponentDetailsQuery(componentId);

    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader title={component.title} />

            <ComponentDescription component={component} />
            <ComponentLinkResources component={component} />
            <ComponentFileResource component={component} />
        </Space>
    );
};

export default ComponentDetailPage;
