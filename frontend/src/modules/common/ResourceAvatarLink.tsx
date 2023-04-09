import { Avatar, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FileOutlined, LinkOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ResourceAvatarLink = ({ resource, disabled }) => {
    const isFIleResourceType = resource.type === 'FILE';
    const avatar = (
        <Space>
            <Avatar
                size={'small'}
                icon={isFIleResourceType ? <FileOutlined /> : <LinkOutlined />}
                src={resource.file_link ? resource.file_link : null}
            />
            <Text disabled={disabled}>{resource.title}</Text>
        </Space>
    );

    if (disabled) {
        return avatar;
    }
    return (
        <Link
            target={'_blank'}
            to={isFIleResourceType ? resource.file_link : resource.url}
        >
            {avatar}
        </Link>
    );
};

export default ResourceAvatarLink;
