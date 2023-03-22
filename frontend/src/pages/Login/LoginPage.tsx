import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { useLoginMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginFormContainerStyle: React.CSSProperties = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '500px',
};

const LoginPage = () => {
    const [login, data] = useLoginMutation();
    const navigate = useNavigate();

    const handleLogin = (values) => {
        login(values)
            .unwrap()
            .then((response) => {
                navigate('/courses');
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
                size="large"
            >
                <Form.Item
                    label=""
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj adres email!',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Adres email"
                    />
                </Form.Item>

                <Form.Item
                    label=""
                    style={{ width: '100%' }}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj hasło!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder={'Hasło'}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        data-cy={'login-button'}
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Zaloguj
                    </Button>
                </Form.Item>
            </Form>
            <a style={{ float: 'right' }} href="">
                Zapomniałem hasła
            </a>
        </div>
    );
};

export default LoginPage;
