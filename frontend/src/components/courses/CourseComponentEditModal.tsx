import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import {
    TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
    TEXT_DESCRIPTION,
    TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE,
    TEXT_FORM_NO_DESCRIPTION_WARNING,
    TEXT_FORM_NO_TITLE_WARNING,
    TEXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER,
    TEXT_SAVE,
    TEXT_TITLE,
    TEXT_TYPE,
} from '../../texts';

const courseComponentTypeToTextMap: { [key: string]: string } = {
    [Enums.COURSE_STEP_COMPONENT_TYPES.EXERCISE]:
        TEXT_COURSE_COMPONENT_TYPE_EXERCISE,
    [Enums.COURSE_STEP_COMPONENT_TYPES.FILE_EVALUATION]:
        TEXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_STEP_COMPONENT_TYPES.UNKNOWN]:
        TEXT_COURSE_COMPONENT_TYPE_UNKNOWN,
};

const CourseComponentEditModal = ({ component, isOpen, onOk, onCancel }) => {
    return (
        <Modal
            title={TEXT_EDIT_COURSE_COMPONENT_MODAL_TITLE}
            open={isOpen}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Form
                name="edit-course-component"
                initialValues={{
                    remember: true,
                    title: component.title,
                    description: component.description,
                    type: component.type,
                    uuid: component.uuid,
                }}
                onFinish={onOk}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item hidden={true} name="uuid">
                    <Input />
                </Form.Item>
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
                        {Object.entries(Enums.COURSE_STEP_COMPONENT_TYPES).map(
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
                        data-cy="course-component-edit-submit-button"
                        type="primary"
                        htmlType="submit"
                        style={{ float: 'right' }}
                    >
                        {TEXT_SAVE}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseComponentEditModal;
