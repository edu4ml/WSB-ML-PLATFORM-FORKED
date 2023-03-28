import { Button, Col, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import {
    TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
    TEXT_CREATE_COURSE_COMPONENT,
    TEXT_DESCRIPTION,
    TEXT_FORM_NO_DESCRIPTION_WARNING,
    TEXT_FORM_NO_TITLE_WARNING,
    TEXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER,
    TEXT_NEW_COURSE_COMPONENT_MODAL_TITLE,
    TEXT_TITLE,
    TEXT_TYPE,
} from '../../texts';

const courseComponentTypeToTextMap: { [key: string]: string } = {
    [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    [Enums.COURSE_COMPONENT_TYPE.EVALUATION]:
        TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_COMPONENT_TYPE.OTHER]: TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
};

const CourseComponentCreateModal = ({ isOpen, onClose, onCreate }) => {
    return (
        <Modal
            title={TEXT_NEW_COURSE_COMPONENT_MODAL_TITLE}
            open={isOpen}
            onOk={onCreate}
            onCancel={onClose}
            footer={null}
            width={1000}
        >
            <Form
                name="create-new-course-component"
                initialValues={{ remember: true }}
                onFinish={onCreate}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label={TEXT_TITLE}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: TEXT_FORM_NO_TITLE_WARNING,
                        },
                    ]}
                >
                    <Input data-cy="course-component-create-new-title" />
                </Form.Item>
                <Form.Item
                    label={TEXT_DESCRIPTION}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: TEXT_FORM_NO_DESCRIPTION_WARNING,
                        },
                    ]}
                >
                    <Input.TextArea data-cy="course-component-create-new-description" />
                </Form.Item>
                <Form.Item label={TEXT_TYPE} name="type">
                    <Select
                        placeholder={
                            TEXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER
                        }
                    >
                        {Object.entries(Enums.COURSE_COMPONENT_TYPE).map(
                            ([key, value]) => (
                                <Select.Option value={key} key={key}>
                                    {courseComponentTypeToTextMap[value]}
                                </Select.Option>
                            )
                        )}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        data-cy="course-component-create-new-submit-button"
                        type="primary"
                        htmlType="submit"
                        style={{ float: 'right' }}
                    >
                        {TEXT_CREATE_COURSE_COMPONENT}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseComponentCreateModal;
