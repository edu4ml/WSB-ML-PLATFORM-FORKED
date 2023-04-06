import { Button, Form, Input, Modal, Upload, notification } from 'antd';
import React from 'react';
import { useIssueCommandMutation } from '../../features/courses/coursesApi';
import { DeleteTwoTone, LinkOutlined } from '@ant-design/icons';
import { NOTIF_SOMETHING_WENT_WRONG } from '../../texts';
import { UploadOutlined } from '@ant-design/icons';
import { Enums } from '../../shared';

const RemoveComponentButton = ({ component, resource }) => {
    const [issueCommand, {}] = useIssueCommandMutation();

    return (
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
        />
    );
};

const UploadFileButton = ({ component }) => {
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
            <Button icon={<UploadOutlined />}>Prześlij plik</Button>
        </Upload>
    );
};

const AddLinkResource = ({ component }) => {
    const [issueCommand, {}] = useIssueCommandMutation();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const onOk = (values) => {
        issueCommand({
            command: {
                type: Enums.COMMAND_TYPES.ADD_LINK_RESOURCE_TO_COMPONENT,
                component_uuid: component.uuid,
                url: values.url,
                title: values.title,
            },
        })
            .unwrap()
            .then((response) => {
                notification.info({
                    message: 'Pomyślnie dodano!',
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

    const onCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Button
            icon={<LinkOutlined />}
            onClick={() => {
                setIsModalOpen(true);
            }}
            key={'add-link-resource'}
        >
            Dodaj materiały zewnętrzne
            <Modal
                open={isModalOpen}
                footer={null}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form
                    name="add-link-resource"
                    onFinish={onOk}
                    autoComplete="on"
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="Tytuł"
                        rules={[{ required: true }, { type: 'string', min: 3 }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="url"
                        label="Adres URL"
                        rules={[
                            { required: true },
                            { type: 'url' },
                            { type: 'string', min: 6 },
                        ]}
                    >
                        <Input type="url" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Dodaj
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Button>
    );
};

export { RemoveComponentButton, UploadFileButton, AddLinkResource };
