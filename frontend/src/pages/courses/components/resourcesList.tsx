import { Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ResourceAvatarLink from '../../../components/common/ResourceAvatarLink';

const { Text } = Typography;

const ResourcesList = ({ resources, disabled = true }) => {
    const { t } = useTranslation();
    return (
        <Space direction="vertical">
            <Text disabled={disabled} strong>
                {t('Additional materials')}
            </Text>

            {resources.map((resource) => (
                <ResourceAvatarLink
                    key={resource.uuid}
                    resource={resource}
                    disabled={disabled}
                />
            ))}
        </Space>
    );
};

export default ResourcesList;
