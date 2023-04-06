import { Card, List } from 'antd';
import React from 'react';
import ResourceAvatarLink from '../../components/common/ResourceAvatarLink';
import { ComponentType } from '../../types/course';
import {
    AddLinkResource,
    RemoveComponentButton,
    UploadFileButton,
} from './ComponentActions';

const ComponentLinkResources = ({ component }) => {
    const linkResources = component.resources.filter(
        (resource) => resource.type === 'URL'
    );

    const getActions = (resource) => {
        return [
            <RemoveComponentButton component={component} resource={resource} />,
        ];
    };

    return (
        <Card
            title={'Linki'}
            extra={[<AddLinkResource component={component} />]}
        >
            <List
                itemLayout="horizontal"
                dataSource={linkResources}
                renderItem={(resource: ComponentType) => (
                    <List.Item actions={getActions(resource)}>
                        <ResourceAvatarLink
                            key={resource.uuid}
                            resource={resource}
                            disabled={false}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

const ComponentFileResource = ({ component }) => {
    const fileResources = component.resources.filter(
        (resource) => resource.type === 'FILE'
    );

    const getActions = (resource) => {
        return [
            <RemoveComponentButton component={component} resource={resource} />,
        ];
    };

    return (
        <Card
            title="Materiały dodatkowe"
            extra={<UploadFileButton component={component} />}
        >
            <List
                itemLayout="horizontal"
                dataSource={fileResources}
                renderItem={(resource: ComponentType) => (
                    <List.Item actions={getActions(resource)}>
                        <ResourceAvatarLink
                            key={resource.uuid}
                            resource={resource}
                            disabled={false}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export { ComponentLinkResources, ComponentFileResource };
