import React from 'react';
import { Layout } from 'antd';
import MyHeader from './Header';
import SideBarMenu from './Sidebar';
import RightSidebar from './RightSidebar';

const { Header, Sider, Footer } = Layout;

const backgroundColor = '#f4f7fc';
// const backgroundColor = '#fff';

const headerStyle: React.CSSProperties = {
    minHeight: '100px',
    background: backgroundColor,
};
const leftSiderStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    height: '100vh',
    overflow: 'auto',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
};

const mainLayoutStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    marginLeft: '350px',
};

const MainLayout = ({ children }) => {
    return (
        <Layout style={mainLayoutStyle}>
            <Sider style={leftSiderStyle} width={350}>
                <SideBarMenu />
            </Sider>
            <Layout>
                <Header style={headerStyle}>
                    <MyHeader />
                </Header>
                {children}
                <Footer style={{ textAlign: 'center' }} />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
