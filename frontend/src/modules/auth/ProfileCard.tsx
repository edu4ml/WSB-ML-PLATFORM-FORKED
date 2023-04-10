import * as React from 'react';
import { Card, Skeleton, Space, Typography } from 'antd';
import { useUserProfileQuery } from '../../features/auth/authApi';

const { Title, Paragraph } = Typography;

const ProfileCard = () => {
    const { data } = useUserProfileQuery('userDetails');

    return (
        <Card title={'👋 Hello!'} bordered={false}>
            <Title></Title>
            <Paragraph>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </Paragraph>
        </Card>
    );
};

export default ProfileCard;
