import React from 'react';
import './App.css';
import { LoginPage, ProfileCard } from './pages';
import { Button, Result } from 'antd';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';

import PrivateRoute from './components/router/PrivateRoute';
import LoginLayout from './pages/Layout/LoginLayout';
import MainLayout from './pages/Layout/MainLayout';
import SimpleLayout from './pages/Layout/SimpleLayout';
import CourseDetailPage from './pages/CourseDetails/CourseDetailPage';
import CourseEditPage from './pages/CoursesEdit/CourseEditPage';
import DashboardPage from './pages/Dashboards/DashboardPage';
import ComponentsPage from './pages/Components/ComponentsPage';
import ComponentDetailPage from './pages/ComponentsDetails/ComponentsDetailPage';
import CoursesDashboard from './pages/courses/containers/coursesDashboard';
import CourseEdit from './pages/courses/containers/courseEdit';
import CourseDetail from './pages/courses/containers/courseDetail';

const App = () => {
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
                                    <SimpleLayout>
                                        <ProfileCard />
                                    </SimpleLayout>
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/courses"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <SimpleLayout>
                                        <CoursesDashboard />
                                    </SimpleLayout>
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/courses/:courseId"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <SimpleLayout>
                                        <CourseDetail />
                                    </SimpleLayout>
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/courses/:courseId/edit"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <SimpleLayout>
                                        <CourseEdit />
                                    </SimpleLayout>
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/course-components"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <SimpleLayout>
                                        <ComponentsPage />
                                    </SimpleLayout>
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/course-components/:componentId"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <SimpleLayout>
                                        <ComponentDetailPage />
                                    </SimpleLayout>
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/app/dashboard"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <SimpleLayout>
                                        <DashboardPage />
                                    </SimpleLayout>
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
                                subTitle="Przepraszam, ta strona nie istnieje!"
                                extra={
                                    <Button type="primary">
                                        <Link to={'/'}>Wracam</Link>
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
