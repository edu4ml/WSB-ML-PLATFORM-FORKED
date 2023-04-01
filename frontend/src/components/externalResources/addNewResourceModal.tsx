import { Button, Divider, Form, Input, Modal, Upload } from 'antd';
import React from 'react';
import {
    TEXT_EXTERNAL_RESOURCE_CREATE_NEW,
    TEXT_EXTERNAL_RESOURCE_NO_TITLE_WARNING,
    TEXT_EXTERNAL_RESOURCE_NO_URL_WARNING,
    TEXT_EXTERNAL_RESOURCE_TITLE,
    TEXT_EXTERNAL_RESOURCE_URL,
} from '../../texts';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const AddNewResourceModal = ({ isOpen, onCancel, onOk }) => {
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Modal
            title={TEXT_EXTERNAL_RESOURCE_CREATE_NEW}
            open={isOpen}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                name="create-new-external-resource"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={onOk}
            >
                <Form.Item
                    label={TEXT_EXTERNAL_RESOURCE_TITLE}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: TEXT_EXTERNAL_RESOURCE_NO_TITLE_WARNING,
                        },
                    ]}
                >
                    <Input data-cy="external-resource-create-new-name" />
                </Form.Item>
                <Form.Item
                    label={TEXT_EXTERNAL_RESOURCE_URL}
                    name="url"
                    rules={[
                        {
                            type: 'url',
                            required: true,
                            message: TEXT_EXTERNAL_RESOURCE_NO_URL_WARNING,
                        },
                    ]}
                >
                    <Input data-cy="external-resource-create-new-url" />
                </Form.Item>
                <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                >
                    <Upload
                        name="files"
                        action="/upload.do"
                        listType="picture"
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                        {/* <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p> */}
                    </Upload>
                </Form.Item>
                <Divider />
                <Form.Item>
                    <Button
                        data-cy="external-resource-create-new-submit-button"
                        type="primary"
                        htmlType="submit"
                        style={{ float: 'right' }}
                    >
                        {TEXT_EXTERNAL_RESOURCE_CREATE_NEW}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddNewResourceModal;
