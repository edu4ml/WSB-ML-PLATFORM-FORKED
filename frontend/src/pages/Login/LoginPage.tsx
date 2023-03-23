import React from 'react';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { useLoginMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import GoogleButton from 'react-google-button'


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

    const responseGoogle = (e) => {
        console.log('Google buttol clicked: ', e);
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const redirectUri = 'api/v1/auth/login/google/';

        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id: '797542642345-q6uivdpghknfu9bo29tke693em4hp23s.apps.googleusercontent.com',
            redirect_uri: 'http://127.0.0.1:8000/api/auth/login/google',
            // redirect_uri: `${REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
            prompt: 'select_account',
            access_type: 'offline',
            scope
        };

        const urlParams = new URLSearchParams(params).toString();

        window.location = `${googleAuthUrl}?${urlParams}`;

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
            <GoogleButton
                onClick={responseGoogle}
            />
        </div>
    );
};

export default LoginPage;
