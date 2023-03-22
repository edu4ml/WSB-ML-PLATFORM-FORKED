import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FolderTwoTone } from '@ant-design/icons';

const SideBarMenu = (props) => {
    const navigate = useNavigate();

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ backgroundColor: 'rgb(0,0,0,0)', height: '100%' }}
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
            ]}
        />
    );
};

export default SideBarMenu;
