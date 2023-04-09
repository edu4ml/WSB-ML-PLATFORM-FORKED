import { useParams } from 'react-router';
import { useGetComponentDetailsQuery } from '../../../features/courses/coursesApi';
import React from 'react';
import { Space } from 'antd';
import PageTitle from '../../common/PageTitle';
import ComponentDescription from '../components/componentDescription';
import {
    ComponentFileResource,
    ComponentLinkResources,
} from '../components/componentResources';

const ComponentDetailPage = () => {
    const { componentId } = useParams();
    const { data: component, isFetching } =
        useGetComponentDetailsQuery(componentId);

    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageTitle title={component.title} />

            <ComponentDescription component={component} />
            <ComponentLinkResources component={component} />
            <ComponentFileResource component={component} />
        </Space>
    );
};

export default ComponentDetailPage;
