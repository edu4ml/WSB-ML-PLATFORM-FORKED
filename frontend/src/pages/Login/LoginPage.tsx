import * as React from 'react';
import { Button, Col, Row, Checkbox, Form, Input, Layout } from 'antd';
import { login } from '../../slices/auth';
import { useAppDispatch } from '../../store';

const { Header, Footer, Content } = Layout;

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const onFinish = (values) => {
        const credentials = {
            login: values.username,
            password: values.password,
            remember: values.remember,
        };
        dispatch(login(credentials));
    };

    return (
        <Layout>
            <Header style={headerStyle}>Header</Header>
            <Content style={contentStyle}>
                <Row>
                    <Col span={8} />
                    <Col span={8}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
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

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8} />
                </Row>
            </Content>
            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    );
};

export default LoginForm;
