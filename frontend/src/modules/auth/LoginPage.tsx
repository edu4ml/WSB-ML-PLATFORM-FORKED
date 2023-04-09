import React, { useState } from 'react';
import { Alert, Button, Card, Divider, Form, Input, Space } from 'antd';
import { useLoginMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import GoogleButton from 'react-google-button';

const LoginFormContainerStyle: React.CSSProperties = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '500px',
};

const LoginPage = () => {
    const [login, {}] = useLoginMutation();
    const navigate = useNavigate();

    const [errorMessageVisible, setErrorMessageVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (values) => {
        login(values)
            .unwrap()
            .then((response) => {
                navigate('/app/courses');
            })
            .catch((err) => {
                console.error('Error while login: ', err);
                setErrorMessage(err.data);
                setErrorMessageVisible(true);
            });
    };

    const responseGoogle = (e) => {
        console.log('Google button clicked: ', e);
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id:
                '797542642345-q6uivdpghknfu9bo29tke693em4hp23s.apps.googleusercontent.com',
            redirect_uri: 'http://127.0.0.1:8000/api/v1/auth/login/google',
            // redirect_uri: `${REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
            prompt: 'select_account',
            access_type: 'offline',
            scope,
        };

        const urlParams = new URLSearchParams(params).toString();

        window.location = `${googleAuthUrl}?${urlParams}`;
    };

    return (
        <Card style={LoginFormContainerStyle}>
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
                        Zaloguj się
                    </Button>
                </Form.Item>
            </Form>
            <Space direction="vertical" style={{ width: '100%' }}>
                <a style={{ float: 'right' }} href="">
                    Nie pamiętam hasła
                </a>

                <Divider>lub</Divider>

                <GoogleButton
                    style={{ width: '100%', borderRadius: '2px' }}
                    onClick={responseGoogle}
                    label={'Zaloguj się za pomocą konta Google'}
                />
                {errorMessageVisible && (
                    <Alert
                        style={{ marginTop: '20px' }}
                        message="Błąd logowania"
                        // description={errorMessage}
                        type="error"
                        showIcon
                        closable
                        afterClose={() => setErrorMessageVisible(false)}
                    />
                )}
            </Space>
        </Card>
    );
};

export default LoginPage;
