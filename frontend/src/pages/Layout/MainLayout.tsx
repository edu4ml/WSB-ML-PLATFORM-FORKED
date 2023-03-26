import React from 'react';
import { Layout } from 'antd';
import MyHeader from './Header';
import SideBarMenu from './Sidebar';
import RightSidebar from './RightSidebar';

const { Header, Sider } = Layout;

const backgroundColor = '#f4f7fc';
// const backgroundColor = '#fff';

const headerStyle: React.CSSProperties = {
    minHeight: '100px',
    background: backgroundColor,
};
const leftSiderStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    height: '100vh',
};
const mainLayoutStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};

const rightSiderStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: '20px',
    paddingLeft: '10px',
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
            </Layout>
        </Layout>
    );
};

export default MainLayout;
