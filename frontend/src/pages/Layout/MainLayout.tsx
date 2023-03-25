import React from 'react';
import { Col, Row, Layout, Card } from 'antd';
import MyHeader from './Header';
import SideBarMenu from './Sidebar';
import RightSidebar from './RightSidebar';

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
    paddingRight: '10px',
    // backgroundColor: '#fff',
};

const footerStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};

const leftSiderStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};
const rightSiderStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: '20px',
    paddingLeft: '10px',
};

const mainLayoutStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};

const contentLayoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
};

const MainLayout = ({ children }) => {
    return (
        <Layout style={mainLayoutStyle}>
            <Header style={headerStyle}>
                <MyHeader />
            </Header>
            {children}
            {/* <Layout style={mainLayoutStyle}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth={0}
                    style={leftSiderStyle}
                >
                    <SideBarMenu />
                </Sider>
                <Layout style={contentLayoutStyle}>
                    <Content style={contentStyle}>{children}</Content>
                </Layout>
                <Sider
                    width={450}
                    breakpoint="lg"
                    collapsedWidth={0}
                    style={rightSiderStyle}
                >
                    <RightSidebar />
                </Sider>
            </Layout> */}
        </Layout>
    );
};

export default MainLayout;
