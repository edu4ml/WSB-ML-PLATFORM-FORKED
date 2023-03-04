import React from 'react';
import { Col, Row, Layout } from 'antd';

const { Header, Footer, Content, Sider } = Layout;

const headerStyle: React.CSSProperties = {
    minHeight: '100px',
    background: '#fff',
};

const contentStyle: React.CSSProperties = {
    color: '#fff',

    backgroundColor: '#fff',
};

const footerStyle: React.CSSProperties = {
    backgroundColor: '#fff',
};

const siderStyle: React.CSSProperties = {
    backgroundColor: '#fff',
};

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
};

const LoginLayout = ({ children }) => {
    return (
        <Layout style={layoutStyle}>
            <Content style={contentStyle}>{children}</Content>
        </Layout>
    );
};

export default LoginLayout;
