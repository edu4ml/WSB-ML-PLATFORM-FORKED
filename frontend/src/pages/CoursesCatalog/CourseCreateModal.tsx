import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import {
    CATEGORY_BUTTON_TEXTS,
    CATEGORY_OTHER_TEXTS,
    CATEGORY_TITLES,
} from '../../texts';

const CourseCreateModal = ({ onOk, onCancel, isOpen }) => {
    return (
        <Modal
            title={CATEGORY_OTHER_TEXTS.newCourseTitle}
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
                    label={CATEGORY_TITLES.newCourse}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: CATEGORY_OTHER_TEXTS.formNoTitleWarning,
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
                        {CATEGORY_BUTTON_TEXTS.createCourse}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseCreateModal;
