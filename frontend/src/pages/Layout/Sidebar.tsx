import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FolderTwoTone } from '@ant-design/icons';

const SideBarMenu = () => {
    const navigate = useNavigate();

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ backgroundColor: 'rgb(0,0,0,0)', height: '100%' }}
            items={[
                {
                    key: 'dashboard',
                    label: 'Panel',
                    icon: <FolderTwoTone />,
                    onClick: () => {
                        navigate('/dashboard');
                    },
                },
                {
                    key: 'courses',
                    label: 'Kursy',
                    icon: <FolderTwoTone />,
                    onClick: () => {
                        navigate('/courses');
                    },
                },
                {
                    key: 'exercises',
                    label: 'Ćwiczenia',
                    icon: <FolderTwoTone />,
                    onClick: () => {
                        navigate('/course-components');
                    },
                },
            ]}
        />
    );
};

export default SideBarMenu;
