import React from 'react';
import { Layout } from 'antd';
import SideBarMenu from './Sidebar';
import RightSidebar from './RightSidebar';

const { Content, Sider } = Layout;

const backgroundColor = '#f4f7fc';

const contentStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: '20px',
    paddingRight: '10px',
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

const DashboardLayout = ({ children }) => {
    return (
        <Layout style={mainLayoutStyle}>
            <Sider breakpoint="lg" collapsedWidth={0} style={leftSiderStyle}>
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
        </Layout>
    );
};

export default DashboardLayout;
