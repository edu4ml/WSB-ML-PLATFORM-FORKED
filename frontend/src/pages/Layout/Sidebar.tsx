import React from 'react';
import { Menu } from 'antd';
import { useLogoutMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { FolderTwoTone, SmileTwoTone } from '@ant-design/icons';

const SideBarMenu = (props) => {
    const [logout, {}] = useLogoutMutation();
    const navigate = useNavigate();

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ backgroundColor: 'rgb(0,0,0,0)' }}
            items={[
                {
                    key: 1,
                    label: 'Kursy',
                    icon: <FolderTwoTone />,
                    onClick: () => {
                        navigate('/courses');
                    },
                },
                {
                    key: 2,
                    label: 'Ćwiczenia',
                    icon: <FolderTwoTone />,
                    onClick: () => {
                        navigate('/exercises');
                    },
                },
                {
                    key: 10,
                    label: 'Profil',
                    icon: <SmileTwoTone />,
                    onClick: () => {
                        navigate('/profile');
                    },
                },
                {
                    key: 11,
                    label: 'Wyloguj',
                    onClick: () => {
                        logout('logoutUser');
                        navigate('/');
                    },
                },
            ]}
        />
    );
};

export default SideBarMenu;
