import * as React from 'react';
import { Typography } from 'antd';
import { useAppSelector } from '../../hooks';

const { Title, Paragraph, Text, Link } = Typography;

const ProfileForm = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <Title>
            User is authenticated: {isAuthenticated ? 'True' : 'False'}
        </Title>
    );
};

export default ProfileForm;
