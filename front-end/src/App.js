import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios'
import Home from './components/Home';
import Overview from './components/Overview/Overview';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import ProjectsOverview from './components/ProjectsOverview';
import ProjectsDetails from './components/ProjectsDetails';
import StudentsOverview from './components/StudentsOverview';
import StudentsDetails from './components/StudentsDetails';

class App extends Component {
  constructor() {
    super();
    axios.get('http://localhost:8000/api/test', {
      headers: {
        Authorization: 'Bearer 8|hDcbmp2W1CoSznmjSL4dAPfjy19o1RZatBGsVa1l'
      }
    })
  }

  render() {
    return (
      <Router>
        {/* <Button variant="primary">test</Button> */}
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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    )
  }
}
export default App