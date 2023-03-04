import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Row } from 'antd';
import { useLoginMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const LoginFormContainerStyle: React.CSSProperties = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '500px',
};

const LoginPage = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [login, data] = useLoginMutation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (isAuthenticated) navigate('/profile');
    // }, [isAuthenticated]);

    const handleLogin = (values) => {
        login(values)
            .unwrap()
            .then((response) => {
                navigate('/profile');
            })
            .catch((err) => {
                console.error('Error while login: ', err);
            });
    };

    return (
        <div style={LoginFormContainerStyle}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    style={{ width: '100%' }}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
