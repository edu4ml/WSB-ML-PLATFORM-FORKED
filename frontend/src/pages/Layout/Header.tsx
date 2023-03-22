import { Col, Divider, Row } from 'antd';
import React from 'react';
import { useAppSelector } from '../../hooks';
import UserProfileAvatar from './UserProfileAvatar';

const MyHeader = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <>
            <Row>
                <Col span={21}></Col>
                <Col span={3}>{isAuthenticated && <UserProfileAvatar />}</Col>
            </Row>
            <Divider
                style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
            />
        </>
    );
};

export default MyHeader;
