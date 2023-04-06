import { Button, Col, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { Enums } from '../../shared';
import {
    TXT_EXERCISE,
    TXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    TXT_OTHER,
    BTN_CREATE_COURSE_COMPONENT,
    TXT_DESCRIPTION,
    TXT_FORM_NO_DESCRIPTION_WARNING,
    TXT_FORM_NO_TITLE_WARNING,
    TXT_FORM_SELECT_COMPONENT_TYPE_PLACEHOLDER,
    TITLE_NEW_COURSE_COMPONENT,
    TXT_TITLE,
    TXT_TYPE,
} from '../../texts';

const courseComponentTypeToTextMap: { [key: string]: string } = {
    [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: TXT_EXERCISE,
    [Enums.COURSE_COMPONENT_TYPE.EVALUATION]:
        TXT_COURSE_COMPONENT_TYPE_FILE_EVALUATION,
    [Enums.COURSE_COMPONENT_TYPE.OTHER]: TXT_OTHER,
};

const ComponentCreateModal = ({ isOpen, onClose, onCreate }) => {
    return (
        <Modal
            title={TITLE_NEW_COURSE_COMPONENT}
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
                        data-cy="course-component-create-new-type"
                    >
                        {Object.entries(Enums.COURSE_COMPONENT_TYPE).map(
                            ([key, value]) => (
                                <Select.Option
                                    value={key}
                                    key={key}
                                    data-cy={`course-component-create-new-type-${value}`}
                                >
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
                        {BTN_CREATE_COURSE_COMPONENT}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ComponentCreateModal;
