import React from 'react';
import { LoginPage, ProfileCard } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/router/PrivateRoute';
import LoginLayout from './pages/Layout/LoginLayout';
import MainLayout from './pages/Layout/MainLayout';
import CoursesPage from './pages/Courses/CoursesPage';

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
                </Routes>
            </div>
        </Router>
    );
};

export default App;
