import { Button, Card, Typography, notification } from 'antd';
import React, { useState } from 'react';
import { ComponentType } from '../../../types/course';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';
import { SaveOutlined } from '@ant-design/icons';
import { Enums } from '../../../shared';
import { useTranslation } from 'react-i18next';

const { Paragraph } = Typography;

const ComponentDescription = ({ component }: { component: ComponentType }) => {
    const { t } = useTranslation();
    const [description, setDescription] = useState(component.description);
    const [issueCommand, {}] = useIssueCommandMutation();

    const updateDescriptionButton = (component) => (
        <Button
            key={'update-description-button'}
            icon={<SaveOutlined />}
            onClick={() => {
                issueCommand({
                    command: {
                        type: Enums.COMMAND_TYPES.COMPONENT_UPDATE,
                        component_uuid: component.uuid,
                        description: description,
                    },
                })
                    .unwrap()
                    .then((response) => {
                        notification.info({
                            message: t('Description updated'),
                            duration: 2,
                        });
                        console.log('response', response);
                    })
                    .catch((err) => {
                        notification.error({
                            message: t('Something went wrong'),
                            duration: 2,
                        });
                        console.error('Error: ', err);
                    });
            }}
        >
            {t('Update')}
        </Button>
    );

    return (
        <Card
            title={t('Description')}
            extra={[updateDescriptionButton(component)]}
        >
            <Paragraph
                editable={{
                    onChange: setDescription,
                    autoSize: { maxRows: 10, minRows: 5 },
                }}
            >
                {description}
            </Paragraph>
        </Card>
    );
};

export default ComponentDescription;
