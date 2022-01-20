import { BrowserRouter as Router, Routes, Route, useNavigate, } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios'
import Home from './components/Home';
import Overview from './components/Overview/Overview';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import SignUp from './components/SignUp';
import Cookies from 'js-cookie';
import Environment from './Environment';
import ProjectsOverview from './components/ProjectsOverview';
import ProjectsDetails from './components/ProjectsDetails';
import StudentsOverview from './components/StudentsOverview';
import StudentsDetails from './components/StudentsDetails';
import { PrivateRoutes } from './components/PrivateRoutes';

class App extends Component {
  constructor() {
    super();
    this.env = new Environment();
    this.state = {
      role: null,
      isLoggedIn: null,
    };
    // this.navigate = useNavigate();
  }

  componentDidMount() {
    if (Cookies.get("Bearertoken")) {
      axios.defaults.headers.common = { 'Authorization': 'Bearer ' + Cookies.get("Bearertoken") };
      this.setState({ isLoggedIn: true });
      this.setState({ role: Cookies.get("Role") });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  render() {
    const { role, isLoggedIn } = this.state;
    return (
      <Router>
        <NavigationBar data={this.props} />
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn ? (
            <React.Fragment>
              <Route path="/overview" element={<Overview />} />
              <Route path="/projects" element={<ProjectsOverview />} />
              <Route path="/projects/1" element={<ProjectsDetails />} />
              <Route path="/students" element={<StudentsOverview />} />
              <Route path="/students/1" element={<StudentsDetails />} />
            </React.Fragment>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          {/* // <Route path="/signup" element={<SignUp />} /> & */}
          {/* <PrivateRoutes /> */}
          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> */}

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    )
  }
}
export default App