import { Button, Card, Typography, notification } from 'antd';
import React, { useState } from 'react';
import { ComponentType } from '../../types/course';
import { NOTIF_SOMETHING_WENT_WRONG } from '../../texts';
import { useIssueCommandMutation } from '../../features/courses/coursesApi';
import { SaveOutlined } from '@ant-design/icons';
import { Enums } from '../../shared';

const { Paragraph } = Typography;

const ComponentDescription = ({ component }: { component: ComponentType }) => {
    const [description, setDescription] = useState(component.description);
    const [issueCommand, {}] = useIssueCommandMutation();

    const updateDescriptionButton = (component) => (
        <Button
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
                            message: 'Zaktualizowano opis!',
                            duration: 2,
                        });
                        console.log('response', response);
                    })
                    .catch((err) => {
                        notification.error({
                            message: NOTIF_SOMETHING_WENT_WRONG,
                            duration: 2,
                        });
                        console.error('Error: ', err);
                    });
            }}
        >
            Zapisz
        </Button>
    );

    return (
        <Card title={'Opis'} extra={[updateDescriptionButton(component)]}>
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
