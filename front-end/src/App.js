import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.env = new Environment;
    this.state = { role: null };
  }

  componentDidMount() {
    if (Cookies.get("Bearertoken")) axios.defaults.headers.common = { 'Authorization': 'Bearer ' + Cookies.get("Bearertoken") };
    this.setState({ role: Cookies.get("Role") });
    console.log(this.state.role)
    axios.get(this.env.baseUrl + 'test')
  }

  render() {
    const { role } = this.state;
    return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsOverview />} />
          <Route path="/projects/1" element={<ProjectsDetails />} />
          <Route path="/students" element={<StudentsOverview />} />
          <Route path="/students/1" element={<StudentsDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    )
  }
}
export default App