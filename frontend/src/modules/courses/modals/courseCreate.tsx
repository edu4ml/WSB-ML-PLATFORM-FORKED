import { Button, Form, Input, Modal, notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Enums } from '../../../shared';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';

const CourseCreateModal = ({ onCancel, isOpen }) => {
    const { t } = useTranslation();
    const [issueCommand, {}] = useIssueCommandMutation();

    const onOk = (values) => {
        const command = {
            type: Enums.COMMAND_TYPES.CREATE_COURSE,
            ...values,
        };
        issueCommand({
            command,
        })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: t('Course created!'),
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
            title={t('Create New Course')}
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
                    label={t('Course Name')}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: t('Please input course name!') as string,
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
                        {t('Create')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseCreateModal;
