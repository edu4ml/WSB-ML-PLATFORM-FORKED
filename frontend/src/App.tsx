import React from 'react';
import { LoginPage, ProfileCard } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/router/PrivateRoute';
import LoginLayout from './pages/Layout/LoginLayout';
import MainLayout from './pages/Layout/MainLayout';
import CoursesPage from './pages/Courses/CoursesPage';
import CourseDetailPage from './pages/Courses/CourseDetailPage';
import { Button, Result } from 'antd';
import './App.css';
import ExerciseDetailPage from './pages/Exercises/ExerciseDetailPage';
import CourseEditPage from './pages/Courses/CourseEditPage';
import TeacherDashboardPage from './pages/Dashboards/TeacherDashboardPage';
import CourseComponentsPage from './pages/CourseComponents/CourseComponentsPage';
import DashboardLayout from './pages/Layout/DashboardLayout';
import CourseComponentsLayout from './pages/Layout/CourseComponentsLayout';
import SimpleLayout from './pages/Layout/SimpleLayout';

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
                        path="/app/resources"
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
                        path="*"
                        element={
                            <Result
                                status="404"
                                title="404"
                                subTitle="Przepraszam, ta strona nie istnieje!"
                                extra={<Button type="primary">Wracam</Button>}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
