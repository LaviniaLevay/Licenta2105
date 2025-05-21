import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Courses from './Courses';
import AboutUs from './AboutUs';
import Signup from './Signup';
import Login from './Login';
import CourseDetails from './CourseDetails';
import Dashboard from './Dashboard';
import Logout from './Logout';
import AdminDashboard from './AdminDashboard';
import Header from './Header';
import Profil from './Profil';
import LearningStyleTest from './LearningStyleTest';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/learning-style-test" element={<LearningStyleTest />} />

            </Routes>
        </>
    );
}

export default App;
