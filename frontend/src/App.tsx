import React, { useEffect } from 'react';
import { LoginForm, ProfileCard } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Col, Row, Checkbox, Form, Input, Layout, Space } from 'antd';
import { useIsAuthenticatedQuery } from './features/auth/authApi';
import { setIsAuthenticated } from './features/auth/authSlice';
import { useAppSelector, useAppDispatch } from './hooks';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

const App = () => {
    const { data, isSuccess } = useIsAuthenticatedQuery('checkAuthenticated');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.isAuthenticated)
            dispatch(setIsAuthenticated(data.isAuthenticated));
    }, [data, isSuccess]);

    return (
        <Router>
            <div className="App">
                <Layout>
                    <Header style={headerStyle}></Header>
                    <Content style={contentStyle}>
                        <Row>
                            <Col span={8} />
                            <Col span={8}>
                                <Routes>
                                    <Route path="/" element={<LoginForm />} />
                                    <Route
                                        path="/profile"
                                        element={<ProfileCard />}
                                    />
                                </Routes>
                            </Col>
                            <Col span={8} />
                        </Row>
                    </Content>
                    <Footer style={footerStyle}></Footer>
                </Layout>
            </div>
        </Router>
    );
};

export default App;
