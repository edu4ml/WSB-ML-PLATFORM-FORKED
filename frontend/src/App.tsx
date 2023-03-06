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
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <ProfileCard />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <CoursesPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses/:courseId"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <CourseDetailPage />
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
