import * as React from 'react';
import { Card, Skeleton, Space, Typography } from 'antd';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import { useAppSelector } from '../../hooks';

const { Title, Paragraph } = Typography;

const ProfileForm = () => {
    const { data } = useGetUserProfileQuery('userDetails');

    return (
        <Card title={'👋 Hello!'} bordered={false}>
            <Title></Title>
            <Paragraph>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </Paragraph>
        </Card>
    );
};

export default ProfileForm;
