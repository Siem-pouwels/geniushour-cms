import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Home from './components/Home';
import Overview from './components/Overview/Overview';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cookies from 'js-cookie';
import ProjectsOverview from './components/ProjectsOverview';
import ProjectsDetails from './components/ProjectsDetails';
import ProjectsCreate from './components/ProjectsCreate';
import StudentsOverview from './components/StudentsOverview';
import StudentsDetails from './components/StudentsDetails';
import StudentDashboard from './components/DashboardStudent';
import TeacherDashboard from './components/DashboardTeacher';
import ImgUpload from './components/ImgUpload';
import { UserContext } from './UserContext';
import Admin from './components/Admin';
import PasswordReset from './components/PasswordReset';

export default function App() {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (Cookies.get("Bearertoken") && Cookies.get("Role")) {
      axios.defaults.headers.common = { 'Authorization': 'Bearer ' + Cookies.get("Bearertoken") };
      setUser({ role: Cookies.get("Role"), isLoggedIn: true });
    }
    else setUser({ role: null, isLoggedIn: false })
  }, [user.isLoggedIn])

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {user.isLoggedIn ? (
          <>
            <Route path="/img" element={<ImgUpload />} />
            {user.role == "student" ? (
              <>
                <Route path="/overview" element={<Overview />} />
                <Route path="/projects" element={<ProjectsOverview />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
              </>
            ) : (null)
            }
            {user.role == "teacher" ? (
              <>
                <Route path="/overview" element={<Overview />} />
                <Route path="/projects" element={<ProjectsOverview />} />
                <Route path="/projects/edit/:id" element={<ProjectsDetails />} />
                <Route path="/projects/create" element={<ProjectsCreate />} />
                <Route path="/students" element={<StudentsOverview />} />
                <Route path="/students/:id" element={<StudentsDetails />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              </>
            ) : (null)
            }
            {user.role == "admin" ? (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/students/:id" element={<StudentsDetails />} />
              </>
            ) : (null)
            }
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password/reset" element={<PasswordReset />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  )
}