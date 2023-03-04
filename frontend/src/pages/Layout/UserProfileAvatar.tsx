import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Skeleton, Typography } from 'antd';
import { useGetUserProfileQuery } from '../../features/auth/authApi';

const { Text } = Typography;

const UserProfileAvatar = () => {
    const { data, isFetching, isSuccess } =
        useGetUserProfileQuery('userDetails');

    if (isSuccess) {
        return (
            <div style={{ float: 'right' }}>
                <Text>{data?.username} </Text>
                <Avatar icon={<UserOutlined />} />
            </div>
        );
    } else {
        return (
            <div style={{ float: 'right' }}>
                <Skeleton.Avatar active />
            </div>
        );
    }
};

export default UserProfileAvatar;
