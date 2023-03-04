import * as React from 'react';
import { Skeleton, Space, Typography } from 'antd';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import { useAppSelector } from '../../hooks';

const { Title, Paragraph } = Typography;

const ProfileForm = () => {
    const { data } = useGetUserProfileQuery('userDetails');

    return (
        <>
            <Title>👋 Hello!</Title>
            <Paragraph>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </Paragraph>
        </>
    );
};

export default ProfileForm;
