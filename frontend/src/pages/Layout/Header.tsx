import { Divider } from 'antd';
import React from 'react';
import UserProfileAvatar from './UserProfileAvatar';

const MyHeader = () => {
    return (
        <>
            <UserProfileAvatar />
            <Divider
                style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
            />
        </>
    );
};

export default MyHeader;
