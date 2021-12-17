import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios'
import Home from './components/Home';
import Overview from './components/Overview/Overview';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

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
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    )
  }
}
export default App