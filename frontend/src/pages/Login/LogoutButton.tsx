import React from 'react';
import { Button } from 'antd';
import { useLogoutMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const [logout, {}] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = (values) => {
        logout('logoutUser');
        navigate('/');
    };

    return (
        <Button type="primary" block onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
