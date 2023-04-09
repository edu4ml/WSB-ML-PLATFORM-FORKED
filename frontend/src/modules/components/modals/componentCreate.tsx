import { Button, Col, Form, Input, Modal, Select, notification } from 'antd';
import React from 'react';
import { Enums } from '../../../shared';
import { useTranslation } from 'react-i18next';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';

const ComponentCreateModal = ({ isOpen, onCancel }) => {
    const { t } = useTranslation();
    const [issueCommand, {}] = useIssueCommandMutation();

    const courseComponentTypeToTextMap: { [key: string]: string } = {
        [Enums.COURSE_COMPONENT_TYPE.EXERCISE]: t('Exercise'),
        [Enums.COURSE_COMPONENT_TYPE.EVALUATION]: t('File evaluation'),
        [Enums.COURSE_COMPONENT_TYPE.OTHER]: t('Other'),
    };

    const onOk = (values) => {
        const command = {
            type: Enums.COMMAND_TYPES.CREATE_COMPONENT,
            ...values,
        };

        issueCommand({
            command,
        })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: t('Component created!'),
                    duration: 2,
                });
                onCancel();
            })
            .catch((err) => {
                notification.error({
                    message: t('Ups! something went wrong!'),
                    duration: 2,
                });
                onCancel();
            });
    };

    return (
        <Modal
            title={t('New course component')}
            open={isOpen}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={1000}
        >
            <Form
                name="create-new-course-component"
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
                            message: t('Please enter a title') as string,
                        },
                    ]}
                >
                    <Input data-cy="course-component-create-new-title" />
                </Form.Item>
                <Form.Item
                    label={t('Description')}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: t('Please enter a description') as string,
                        },
                    ]}
                >
                    <Input.TextArea data-cy="course-component-create-new-description" />
                </Form.Item>
                <Form.Item label={t('Title')} name="type">
                    <Select
                        placeholder={t('Select a component type')}
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
                        {t('Create')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ComponentCreateModal;
