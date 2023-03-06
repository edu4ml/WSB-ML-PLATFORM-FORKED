import React from 'react';
import { Col, Row, Layout, Card } from 'antd';
import MyHeader from './Header';
import SideBarMenu from './Sidebar';

const { Header, Footer, Content, Sider } = Layout;

const backgroundColor = '#f4f7fc';
// const backgroundColor = '#fff';

const headerStyle: React.CSSProperties = {
    minHeight: '100px',
    background: backgroundColor,
};

const contentStyle: React.CSSProperties = {
    // color: '#fff',
    backgroundColor: backgroundColor,
    padding: '20px',
    // backgroundColor: '#fff',
};

const footerStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};

const siderStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    maxWidth: '1600px',
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
