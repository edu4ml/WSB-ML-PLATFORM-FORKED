import { Avatar, Button, Card, List, Space, Upload, notification } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import PageHeader from '../../components/common/PageHeader';
import {
    useGetComponentDetailsQuery,
    useIssueCommandMutation,
} from '../../features/courses/coursesApi';
import ResourceAvatarLink from '../../components/common/ResourceAvatarLink';
import { FileOutlined, DeleteTwoTone } from '@ant-design/icons';
import { ComponentType } from '../../types/course';
import type { UploadFile } from 'antd/es/upload/interface';
import { NOTIF_SOMETHING_WENT_WRONG } from '../../texts';
import { useDeleteCourseComponentFileResourceMutation } from '../../features/courses/coursesApi';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { RcFile } from 'antd/lib/upload/interface';
import { Enums } from '../../shared';

interface CustomRcFile extends RcFile {
    originFileObj: Blob;
}

const UploadFileButton = ({ component }) => {
    const [removeFileResource, {}] =
        useDeleteCourseComponentFileResourceMutation();
    const [issueCommand, {}] = useIssueCommandMutation();

    const onFileChange = ({ fileList }) => {
        if (!fileList.length) {
            notification.error({
                message: 'Please attach a file',
                duration: 2,
            });
            return;
        }
        const formData = new FormData();
        formData.append(
            'type',
            Enums.COMMAND_TYPES.ADD_ATTACHMENT_TO_COMPONENT
        );
        formData.append('file', fileList[0].originFileObj);
        formData.append('component_uuid', component.uuid);

        issueCommand({ command: formData })
            .unwrap()
            .then((response) => {
                notification.info({
                    message: 'File uploaded!',
                    duration: 2,
                });
                console.log('response', response);
            })
            .catch((err) => {
                notification.error({
                    message: NOTIF_SOMETHING_WENT_WRONG,
                    duration: 2,
                });
                console.error('Error: ', err);
            });
    };

    return (
        <Upload
            style={{ width: '100%' }}
            showUploadList={false}
            beforeUpload={() => {
                return false;
            }}
            name="file"
            onChange={onFileChange}
            maxCount={4}
        >
            <Button type="primary" block icon={<UploadOutlined />}>
                Prześlij plik
            </Button>
        </Upload>
    );
};

const ComponentDetailPage = () => {
    const { componentId } = useParams();
    const { data: component, isFetching } =
        useGetComponentDetailsQuery(componentId);
    const [issueCommand, {}] = useIssueCommandMutation();

    if (isFetching) {
        return <div>Loading...</div>;
    }
    const linkResources = component.resources.filter(
        (resource) => resource.type === 'URL'
    );

    const fileResources = component.resources.filter(
        (resource) => resource.type === 'FILE'
    );

    const getActions = (resource) => {
        return [
            <Button
                type="text"
                icon={<DeleteTwoTone />}
                onClick={() => {
                    issueCommand({
                        command: {
                            type: Enums.COMMAND_TYPES
                                .REMOVE_RESOURCE_FROM_COMPONENT,
                            component_uuid: component.uuid,
                            resource_uuid: resource.uuid,
                        },
                    })
                        .unwrap()
                        .then((response) => {
                            notification.info({
                                message: 'Resource removed!',
                                duration: 2,
                            });
                            console.log('response', response);
                        })
                        .catch((err) => {
                            notification.error({
                                message: NOTIF_SOMETHING_WENT_WRONG,
                                duration: 2,
                            });
                            console.error('Error: ', err);
                        });
                }}
            />,
        ];
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <PageHeader title={component.title} />

            <Card title={'Opis'}>{component.description}</Card>
            <Card title={'Linki'}>
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
        </Space>
    );
};

export default ComponentDetailPage;
