import { Button, notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteTwoTone } from '@ant-design/icons';
import { useIssueCommandMutation } from '../../../features/courses/coursesApi';
import { Enums } from '../../../shared';

const DeleteComponentButton = ({ component }) => {
    const { t } = useTranslation();
    const [issueCommand, {}] = useIssueCommandMutation();

    const onClick = () => {
        const command = {
            type: Enums.COMMAND_TYPES.DELETE_COMPONENT,
            componentUUID: component.uuid,
        };

        issueCommand({
            command,
        })
            .unwrap()
            .then((res) => {
                notification.info({
                    message: t('Component deleted'),
                    duration: 2,
                });
            })
            .catch((err) => {
                notification.error({
                    message: t('Something went wrong'),
                    duration: 2,
                });
            });
    };

    return (
        <Button icon={<DeleteTwoTone />} onClick={onClick}>
            {t('Remove')}
        </Button>
    );
};

const getActions = (component): Array<React.ReactNode> => {
    return [<DeleteComponentButton component={component} />];
};

export default getActions;
