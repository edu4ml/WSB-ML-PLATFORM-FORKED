import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useLoginMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const LoginForm = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [login, data] = useLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/profile');
    }, [isAuthenticated]);

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={login}
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
    );
};

export default LoginForm;
