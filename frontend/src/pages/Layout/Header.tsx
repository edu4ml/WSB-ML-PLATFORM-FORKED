import { Divider } from 'antd';
import React from 'react';
import { useAppSelector } from '../../hooks';
import UserProfileAvatar from './UserProfileAvatar';

const MyHeader = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <>
            {isAuthenticated && <UserProfileAvatar />}
            <Divider
                style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
            />
        </>
    );
};

export default MyHeader;
