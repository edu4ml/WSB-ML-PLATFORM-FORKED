import { Card, List } from 'antd';
import React from 'react';
import ResourceAvatarLink from '../../common/ResourceAvatarLink';
import { ComponentType } from '../../../types/course';
import {
    AddLinkResource,
    RemoveComponentButton,
    UploadFileButton,
} from '../actions/componentDetailsActions';
import { useTranslation } from 'react-i18next';

const ComponentLinkResources = ({ component }) => {
    const { t } = useTranslation();
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
            title={t('external links')}
            extra={<AddLinkResource component={component} />}
        >
            <List
                itemLayout="horizontal"
                dataSource={linkResources}
                renderItem={(resource: ComponentType) => (
                    <List.Item
                        actions={getActions(resource)}
                        key={resource.uuid}
                    >
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
    const { t } = useTranslation();
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
            title={t('file resources')}
            extra={<UploadFileButton component={component} />}
        >
            <List
                itemLayout="horizontal"
                dataSource={fileResources}
                renderItem={(resource: ComponentType) => (
                    <List.Item
                        actions={getActions(resource)}
                        key={resource.uuid}
                    >
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
