import React from 'react';
import './App.css';
import { LoginPage, ProfileCard } from './modules';
import { Button, Result } from 'antd';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';

import PrivateRoute from './modules/common/PrivateRoute';
import LoginLayout from './modules/Layout/LoginLayout';
import MainLayout from './modules/Layout/MainLayout';
import { DashboardPage } from './screens';
import CoursesDashboard from './modules/courses/containers/coursesDashboard';
import CourseEdit from './modules/courses/containers/courseEdit';
import CourseDetail from './modules/courses/containers/courseDetail';
import ComponentsDashboard from './modules/components/containers/componentsDashboard';
import ComponentDetailPage from './modules/components/containers/componentDetail';
import { useTranslation } from 'react-i18next';

const App = () => {
    const { t } = useTranslation();
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LoginLayout>
                                <LoginPage />
                            </LoginLayout>
                        }
                    />
                    <Route
                        path="/app"
                        element={
                            <LoginLayout>
                                <LoginPage />
                            </LoginLayout>
                        }
                    />
                    <Route
                        path="/app/profile"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <ProfileCard />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/courses"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <CoursesDashboard />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/courses/:courseId"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <CourseDetail />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/courses/:courseId/edit"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <CourseEdit />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/course-components"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <ComponentsDashboard />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/course-components/:componentId"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <ComponentDetailPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/dashboard"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <DashboardPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Result
                                status="404"
                                title="404"
                                subTitle={t('page not found')}
                                extra={
                                    <Button type="primary">
                                        <Link to={'/'}>{t('going back')}</Link>
                                    </Button>
                                }
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
