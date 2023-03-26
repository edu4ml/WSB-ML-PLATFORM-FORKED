import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Skeleton, Space, Typography } from 'antd';
import {
    useGetUserProfileQuery,
    useLogoutMutation,
} from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const { Text } = Typography;

const menuItems: MenuProps['items'] = [
    {
        label: 'Profil',
        key: 'profile',
        icon: <UserOutlined />,
    },
    {
        label: 'Wyloguj',
        key: 'logout',
        icon: <LogoutIcon />,
    },
];

const UserProfileAvatar = () => {
    const { data, isSuccess } = useGetUserProfileQuery('userDetails');
    const [logout, {}] = useLogoutMutation();
    const navigate = useNavigate();

    const onMenuClick = (e) => {
        if (e.key === 'logout') {
            logout('logoutUser');
            navigate('/app/');
        } else if (e.key === 'profile') {
            navigate('/app/profile');
        }
    };

    if (isSuccess) {
        return (
            <Dropdown
                menu={{ items: menuItems, onClick: onMenuClick }}
                placement="bottomRight"
                arrow
            >
                <div
                    style={{ float: 'right', cursor: 'pointer' }}
                    data-cy="top-right-avatar"
                >
                    <Text>{data?.username} </Text>
                    <Avatar icon={<UserOutlined />} />
                </div>
            </Dropdown>
        );
    } else {
        return (
            <div style={{ float: 'right' }}>
                <Skeleton.Avatar active />
            </div>
        );
    }
};

export default UserProfileAvatar;
