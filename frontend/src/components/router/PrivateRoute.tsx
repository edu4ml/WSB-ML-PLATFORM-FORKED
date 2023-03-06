import { Result, Spin } from 'antd';
import React from 'react';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import LogoutButton from '../../pages/Login/LogoutButton';

const PrivateRoute = ({ children }) => {
    const { data, isSuccess } = useGetUserProfileQuery('userDetails');
    if (data && Object.keys(data).length !== 0 && isSuccess) {
        return children;
    } else if (isSuccess) {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Ups, nie powinno Cię tu być!."
                extra={<LogoutButton />}
            />
        );
    } else if (!isSuccess) {
        return (
            <div
                style={{
                    margin: 0,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '40vh',
                }}
            >
                <Spin size="large" />
            </div>
        );
    }
};
export default PrivateRoute;
