import { Skeleton } from 'antd';
import React from 'react';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import LogoutButton from '../../pages/Login/LogoutButton';

const PrivateRoute = ({ children }) => {
    const { data } = useGetUserProfileQuery('userDetails');
    if (data && Object.keys(data).length !== 0) {
        return children;
    }
    return (
        <>
            <Skeleton active />
            <LogoutButton />
        </>
    );
};
export default PrivateRoute;
