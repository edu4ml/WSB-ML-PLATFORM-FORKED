import * as React from 'react';
import { Skeleton, Space, Typography } from 'antd';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import LogoutButton from './LogoutButton';

const { Title, Paragraph } = Typography;

const ProfileForm = () => {
    const { data, isFetching, isSuccess } =
        useGetUserProfileQuery('userDetails');

    if (data && isSuccess) {
        return (
            <>
                <Title>👋 Hello!</Title>
                <Paragraph>
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </Paragraph>
                <Space />
                <LogoutButton />
            </>
        );
    } else {
        return (
            <>
                <Skeleton active />
                <Space />
                <LogoutButton />
            </>
        );
    }
};

export default ProfileForm;
