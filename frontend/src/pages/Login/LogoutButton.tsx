import React from 'react';
import { Button } from 'antd';
import { useLogoutMutation } from '../../features/auth/authApi';

const LogoutButton = () => {
    const [logout, {}] = useLogoutMutation();

    return (
        <Button type="primary" block onClick={logout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
