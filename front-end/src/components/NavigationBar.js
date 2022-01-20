import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Logo from '../logo.png';
import Cookies from 'js-cookie';
import Button from '@restart/ui/esm/Button';

// if (Cookies.get("Bearertoken")) {
//     axios.defaults.headers.common = { 'Authorization': 'Bearer ' + Cookies.get("Bearertoken") };
//     this.setState({ isLoggedIn: true });
// } else {
//     this.setState({ isLoggedIn: false });
//     // this.navigate(`/login`);
// }
// this.setState({ role: Cookies.get("Role") });

// axios.get(this.env.baseUrl + 'student');


class NavigationBar extends Component {
    constructor() {
        super();
        this.state = {
            role: null,
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        // console.log(this.props)
        if (Cookies.get("Bearertoken")) {
            axios.defaults.headers.common = { 'Authorization': 'Bearer ' + Cookies.get("Bearertoken") };
            this.setState({ isLoggedIn: true });
            this.setState({ role: Cookies.get("Role") });
        } else {
            this.setState({ isLoggedIn: false });
        }
    }
    logout() {
        console.log(this.props)
        if (Cookies.get("Bearertoken")) {
            Cookies.remove("Bearertoken")
            Cookies.remove("Role")
        }
        if (Cookies.get("Role")) {
            Cookies.remove("Role")
        }
        this.setState({ isLoggedIn: false })
        this.setState({ role: null })
    }

    render() {
        const { role, isLoggedIn } = this.state;
        return (
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><img src={Logo} height="70px"></img></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {isLoggedIn ? (
                                <React.Fragment>
                                    <LinkContainer to='/overview'>
                                        <Nav.Link>Overview</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/error'>
                                        <Nav.Link>Error</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/dashboard'>
                                        <Nav.Link>Dashboard</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/projects'>
                                        <Nav.Link>Projects</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/students'>
                                        <Nav.Link>Students</Nav.Link>
                                    </LinkContainer>
                                    {/* <LinkContainer to='/signup'>
                                        <Nav.Link>Sign up</Nav.Link>
                                    </LinkContainer> */}
                                    <LinkContainer to='/students'>
                                        <Button onClick={this.logout}>Logout</Button>
                                    </LinkContainer>
                                </React.Fragment>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            )}
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    // < Route path = "/overview" element = {< Overview />} />
    //     < Route path = "/login" element = {< Login />} />
    //         < Route path = "*" element = {< ErrorPage />} />
}

export default NavigationBar;
