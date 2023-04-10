import { Result, Spin } from 'antd';
import React from 'react';
import { useUserProfileQuery } from '../../features/auth/authApi';
import LogoutButton from '../auth/LogoutButton';
import { CATEGORY_OTHER_TEXTS } from '../../texts';

const PrivateRoute = ({ children }) => {
    const { data, isSuccess, isFetching } = useUserProfileQuery('userDetails');

    if (data && Object.keys(data).length !== 0 && isSuccess) {
        return children;
    } else if (!isSuccess && !isFetching) {
        return (
            <Result
                status="403"
                title="403"
                subTitle={CATEGORY_OTHER_TEXTS.error403Description}
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