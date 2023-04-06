import { Button, Form, Input, Modal, Upload } from 'antd';
import React from 'react';
import Cookies from 'js-cookie';

const CourseStepAddSubmissionModal = ({
    courseUUID,
    courseStep,
    isOpen,
    onCancel,
    setFileList,
    onFileChange,
    onOk,
}) => {
    const beforeUpload = (file) => {
        setFileList([file]);
        return false;
    };

    return (
        <Modal
            title={'Prześlij zadanie'}
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
                    label={'Tytuł'}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj tytuł pracy',
                        },
                    ]}
                >
                    <Input data-cy="course-step-add-submission-title" />
                </Form.Item>
                <Form.Item
                    label={'Opis'}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj opis pracy',
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
                    label="Plik"
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
                            message: 'Wybierz plik',
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
                        <Button>Wybierz plik</Button>
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
                        {'Dodaj'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseStepAddSubmissionModal;
