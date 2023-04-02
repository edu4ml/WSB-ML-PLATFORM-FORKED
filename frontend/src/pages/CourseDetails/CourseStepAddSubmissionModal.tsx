import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const CourseStepAddSubmissionModal = ({
    courseStep,
    isOpen,
    onClose,
    onAddSubmission,
}) => {
    return (
        <Modal
            title={'Prześlij zadanie'}
            open={isOpen}
            onOk={onAddSubmission}
            onCancel={onClose}
            footer={null}
        >
            <Form
                name="add-submission"
                initialValues={{ remember: true }}
                onFinish={onAddSubmission}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label={'Link do zadania'}
                    name="link"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj link do zadania',
                        },
                    ]}
                >
                    <Input data-cy="course-step-add-submission-link" />
                </Form.Item>
                <Form.Item>
                    <Button
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
