import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const backgroundColor = '#f4f7fc';

const contentStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    paddingLeft: '40px',
    paddingRight: '40px',
};

const SimpleLayout = ({ children }) => {
    return <Content style={contentStyle}>{children}</Content>;
};

export default SimpleLayout;
