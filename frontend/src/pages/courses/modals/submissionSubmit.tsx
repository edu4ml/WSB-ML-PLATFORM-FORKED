import { Button, Form, Input, Modal, Upload } from 'antd';
import React from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const SubmissionSubmitModal = ({
    isOpen,
    onCancel,
    setFileList,
    onFileChange,
    onOk,
}) => {
    const { t } = useTranslation();

    const beforeUpload = (file) => {
        setFileList([file]);
        return false;
    };

    return (
        <Modal
            title={t('Upload submission')}
            open={isOpen}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                name="create-new-course-step-submission"
                initialValues={{ remember: true }}
                onFinish={onOk}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label={t('Title')}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: t('Please input title!') as string,
                        },
                    ]}
                >
                    <Input data-cy="course-step-add-submission-title" />
                </Form.Item>
                <Form.Item
                    label={t('Description')}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: t('Please input description!') as string,
                        },
                    ]}
                >
                    <Input.TextArea
                        data-cy="course-step-add-submission-description"
                        rows={4}
                    />
                </Form.Item>
                <Form.Item
                    name="file"
                    label={t('File')}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e && e.fileList;
                    }}
                    rules={[
                        {
                            required: true,
                            message: t('Please select file!') as string,
                        },
                    ]}
                >
                    <Upload.Dragger
                        withCredentials={true}
                        headers={{
                            'X-CSRFToken': Cookies.get('csrftoken'),
                        }}
                        name="file"
                        // action={`/api/v1/course/${courseUUID}/step/${courseStep.uuid}/user-progress/${courseStep.user_progress.tracking_uuid}/submission`}
                        listType="picture"
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        onChange={onFileChange}
                    >
                        <Button>{t('Select file')}</Button>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        data-cy="course-step-add-submission-submit-button"
                        type="primary"
                        htmlType="submit"
                        style={{ float: 'right' }}
                    >
                        {t('Submit')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubmissionSubmitModal;
