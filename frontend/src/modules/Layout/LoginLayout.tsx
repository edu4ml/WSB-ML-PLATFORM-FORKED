import React from 'react';
import { Col, Row, Layout } from 'antd';
import Logos from '../common/Logos';

const { Header, Footer, Content, Sider } = Layout;

const headerStyle: React.CSSProperties = {
    minHeight: '100px',
    background: '#fff',
};

const contentStyle: React.CSSProperties = {
    color: '#fff',
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
    backgroundColor: '#f4f7fc',
};

const LoginLayout = ({ children }) => {
    return (
        <Layout style={layoutStyle}>
            <Logos />
            <Content style={contentStyle}>{children}</Content>
        </Layout>
    );
};

export default LoginLayout;
