import React from 'react';
import { Menu } from 'antd';
import { useLogoutMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const SideBarMenu = (props) => {
    const [logout, {}] = useLogoutMutation();
    const navigate = useNavigate();

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: 1,
                    label: 'Kursy',
                    onClick: () => {
                        navigate('/app');
                    },
                },
                {
                    key: 2,
                    label: 'Profil',
                    onClick: () => {
                        navigate('/profile');
                    },
                },
                {
                    key: 3,
                    label: 'Wyloguj',
                    onClick: () => {
                        logout();
                        navigate('/');
                    },
                },
            ]}
        />
    );
};

export default SideBarMenu;
