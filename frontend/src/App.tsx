import React from 'react';
import './App.css';
import { LoginPage, ProfileCard } from './pages';
import { Button, Result } from 'antd';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';

import PrivateRoute from './components/router/PrivateRoute';
import LoginLayout from './pages/Layout/LoginLayout';
import MainLayout from './pages/Layout/MainLayout';
import SimpleLayout from './pages/Layout/SimpleLayout';
import CoursesPage from './pages/CoursesCatalog/CourseCatalogPage';
import CourseDetailPage from './pages/CourseDetails/CourseDetailPage';
import CourseEditPage from './pages/CoursesEdit/CourseEditPage';
import TeacherDashboardPage from './pages/Dashboards/TeacherDashboardPage';
import CourseComponentsPage from './pages/CourseComponents/CourseComponentsPage';
import DashboardLayout from './pages/Layout/DashboardLayout';

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
                                        <CoursesPage />
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
                                        <CourseDetailPage />
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
                                        <CourseEditPage />
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
                                        <CourseComponentsPage />
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
                                    <DashboardLayout>
                                        <TeacherDashboardPage />
                                    </DashboardLayout>
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
