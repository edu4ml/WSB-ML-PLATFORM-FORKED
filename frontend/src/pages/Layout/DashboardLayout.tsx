import React from 'react';
import { Layout } from 'antd';
import RightSidebar from './RightSidebar';

const { Content, Sider } = Layout;

const backgroundColor = '#f4f7fc';

const contentStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: '20px',
    paddingRight: '10px',
};
const rightSiderStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: '20px',
    paddingLeft: '10px',
};

const mainLayoutStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
};

const DashboardLayout = ({ children }) => {
    return (
        <Layout style={mainLayoutStyle}>
            <Content style={contentStyle}>{children}</Content>
            <Sider width={500} style={rightSiderStyle}>
                <RightSidebar />
            </Sider>
        </Layout>
    );
};

export default DashboardLayout;
