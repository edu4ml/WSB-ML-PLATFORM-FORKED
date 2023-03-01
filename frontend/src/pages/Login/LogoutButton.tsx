import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authApi';
import { useAppSelector } from '../../hooks';

const LogoutButton = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [logout, {}] = useLogoutMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [navigate, isAuthenticated]);

    return (
        <Button type="primary" block onClick={logout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
