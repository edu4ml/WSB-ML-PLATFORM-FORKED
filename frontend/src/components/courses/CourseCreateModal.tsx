import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import {
    TEXT_COURSE_TITLE,
    TEXT_CREATE_COURSE,
    TEXT_FORM_NO_TITLE_WARNING,
    TEXT_NEW_COURSE_TITLE,
} from '../../texts';

const CourseCreateModal = ({ onOk, onCancel, isOpen }) => {
    return (
        <Modal
            title={TEXT_NEW_COURSE_TITLE}
            open={isOpen}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                name="create-new-course"
                initialValues={{ remember: true }}
                onFinish={onOk}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label={TEXT_COURSE_TITLE}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: TEXT_FORM_NO_TITLE_WARNING,
                        },
                    ]}
                >
                    <Input data-cy="course-catalog-create-new-name" />
                </Form.Item>
                <Form.Item>
                    <Button
                        data-cy="course-catalog-create-new-submit-button"
                        type="primary"
                        htmlType="submit"
                        style={{ float: 'right' }}
                    >
                        {TEXT_CREATE_COURSE}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseCreateModal;
