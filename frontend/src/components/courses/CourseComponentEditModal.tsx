import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import {
    TXT_EXERCISE,
    TXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TXT_OTHER,
    TXT_DESCRIPTION,
    BTN_EDIT,
    TXT_FORM_NO_DESCRIPTION_WARNING,
    TXT_FORM_NO_TITLE_WARNING,
    TXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER,
    BTN_SAVE,
    TXT_TITLE,
    TXT_TYPE,
} from '../../texts';

const courseComponentTypeToTextMap: { [key: string]: string } = {
    [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: TXT_EXERCISE,
    [Enums.COURSE_COMPONENT_TYPE.EVALUATION]:
        TXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_COMPONENT_TYPE.OTHER]: TXT_OTHER,
};

const CourseComponentEditModal = ({ component, isOpen, onOk, onCancel }) => {
    return (
        <Modal
            title={BTN_EDIT}
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
                    label={TXT_TITLE}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: TXT_FORM_NO_TITLE_WARNING,
                        },
                    ]}
                >
                    <Input data-cy="course-component-create-new-title" />
                </Form.Item>
                <Form.Item
                    label={TXT_DESCRIPTION}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: TXT_FORM_NO_DESCRIPTION_WARNING,
                        },
                    ]}
                >
                    <Input.TextArea data-cy="course-component-create-new-description" />
                </Form.Item>
                <Form.Item label={TXT_TYPE} name="type">
                    <Select
                        placeholder={TXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER}
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
                        data-cy="course-component-edit-submit-button"
                        type="primary"
                        htmlType="submit"
                        style={{ float: 'right' }}
                    >
                        {BTN_SAVE}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseComponentEditModal;
