import { Space, Typography } from 'antd';
import React from 'react';
import ResourceAvatarLink from '../../components/common/ResourceAvatarLink';

const { Text } = Typography;

const CourseStepResourcesList = ({ resources, disabled = true }) => {
    return (
        <Space direction="vertical">
            <Text disabled={disabled} strong>
                Meteriały dodatkowe
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

export default CourseStepResourcesList;
