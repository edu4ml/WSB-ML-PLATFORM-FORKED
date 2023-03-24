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

const mainLayoutStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};

const contentLayoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    maxWidth: '1600px',
    marginLeft: 'auto',
    marginRight: 'auto',
};

const MainLayout = ({ children }) => {
    return (
        <Layout style={mainLayoutStyle}>
            <Sider breakpoint="lg" collapsedWidth={0} style={siderStyle}>
                <SideBarMenu />
            </Sider>
            <Layout style={contentLayoutStyle}>
                <Header style={headerStyle}>
                    <MyHeader />
                </Header>
                <Content style={contentStyle}>{children}</Content>
            </Layout>
            <Footer style={footerStyle} />
        </Layout>
    );
};

export default MainLayout;
