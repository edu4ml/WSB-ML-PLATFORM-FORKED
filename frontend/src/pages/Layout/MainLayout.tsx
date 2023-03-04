import React from 'react';
import { Col, Row, Layout } from 'antd';
import MyHeader from './Header';
import SideBarMenu from './Sidebar';

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

const MainLayout = ({ children }) => {
    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <MyHeader />
            </Header>
            <Layout>
                <Sider style={siderStyle}>
                    <SideBarMenu />
                </Sider>
                <Content style={contentStyle}>{children}</Content>
            </Layout>
            <Footer style={footerStyle} />
        </Layout>
    );
};

export default MainLayout;
