import { Avatar, Space, Typography } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const UserCardAvatar = ({ user, style = {} }) => {
    return (
        <Space direction="horizontal" style={style}>
            <Avatar size={'small'} icon={<UserOutlined />} />
            <Text strong>{user.email}</Text>
        </Space>
    );
};

export default UserCardAvatar;
