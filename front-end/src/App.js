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
import ImgUpload from './components/ImgUpload';
import { UserContext } from './UserContext';

function App() {
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
            {user.role == "student" ? (
              <>
                <Route path="/overview" element={<Overview />} />
                <Route path="/projects" element={<ProjectsOverview />} />
                <Route path="/projects/1" element={<ProjectsDetails />} />
                {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
              </>
            ) : (null)
            }
            {user.role == "teacher" ? (
              <>
                <Route path="/overview" element={<Overview />} />
                <Route path="/projects" element={<ProjectsOverview />} />
                <Route path="/projects/1" element={<ProjectsDetails />} />
                <Route path="/students" element={<StudentsOverview />} />
                {/* <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> */}
                <Route path="/students/1" element={<StudentsDetails />} />
              </>
            ) : (null)
            }
            {user.role == "admin" ? (
              <>
                {/* <Route path="/admin" element={<Admin />} /> */}
              </>
            ) : (null)
            }
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App