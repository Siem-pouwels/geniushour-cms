import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Logo from '../logo.png';


const NavigationBar = () => {
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand><img src={Logo} height="70px"></img></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to='/overview'>
                            <Nav.Link>Overview</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/error'>
                            <Nav.Link>Error</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link>Login</Nav.Link>
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
                        <LinkContainer to='/signup'>
                            <Nav.Link>Sign up</Nav.Link>
                        </LinkContainer>
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

    // < Route path = "/overview" element = {< Overview />} />
    //     < Route path = "/login" element = {< Login />} />
    //         < Route path = "*" element = {< ErrorPage />} />
}

export default NavigationBar
