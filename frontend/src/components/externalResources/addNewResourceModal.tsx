import { Button, Divider, Form, Input, Modal, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { CATEGORY_OTHER_TEXTS, CATEGORY_TITLES } from '../../texts';

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
            title={CATEGORY_TITLES.externalResourceCreateNew}
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
                    label={CATEGORY_OTHER_TEXTS.externalResourceTitle}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message:
                                CATEGORY_OTHER_TEXTS.externalResourceNoTitleWarning,
                        },
                    ]}
                >
                    <Input data-cy="external-resource-create-new-name" />
                </Form.Item>
                <Form.Item
                    label={CATEGORY_OTHER_TEXTS.externalResourceUrl}
                    name="url"
                    rules={[
                        {
                            type: 'url',
                            required: true,
                            message:
                                CATEGORY_OTHER_TEXTS.externalResourceNoUrlWarning,
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
                        {CATEGORY_TITLES.externalResourceCreateNew}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddNewResourceModal;
