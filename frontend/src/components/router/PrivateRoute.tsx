import { Result, Spin } from 'antd';
import React from 'react';
import { useGetUserProfileQuery } from '../../features/auth/authApi';
import LogoutButton from '../../pages/Login/LogoutButton';
import { TEXT_403_DESCRIPTION } from '../../texts';

const PrivateRoute = ({ children }) => {
    const { data, isSuccess, isFetching } =
        useGetUserProfileQuery('userDetails');

    if (data && Object.keys(data).length !== 0 && isSuccess) {
        return children;
    } else if (!isSuccess && !isFetching) {
        return (
            <Result
                status="403"
                title="403"
                subTitle={TEXT_403_DESCRIPTION}
                extra={<LogoutButton />}
            />
        );
    } else if (isFetching) {
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
