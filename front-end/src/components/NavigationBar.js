import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from "react-router";
import Logo from '../logo.png';
import Cookies from 'js-cookie';
import { UserContext } from '../UserContext';
import classes from './Css/Main.module.css'
import { useSnackbar } from 'notistack';

function NavigationBar() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [user, setUser] = useContext(UserContext);
    let navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        if (Cookies.get("Bearertoken")) Cookies.remove("Bearertoken")
        if (Cookies.get("Role")) Cookies.remove("Role")
        setUser({ role: null, isLoggedIn: false })
        navigate('/login')
        enqueueSnackbar('You are logged out', {
            variant: 'warning'
        });
    }

    return (
        <>
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><img src={Logo} height="70px"></img></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user.isLoggedIn ? (
                                <>
                                    {user.role == "student" ? (
                                        <>
                                            <LinkContainer to='/overview'>
                                                <Nav.Link>Overview</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to='/projects'>
                                                <Nav.Link>Projects</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to='/student/dashboard'>
                                                <Nav.Link>Dashboard</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to='/studentgroup/create'>
                                                <Nav.Link>Create studentgroup</Nav.Link>
                                            </LinkContainer>
                                        </>
                                    ) : (null)
                                    }
                                    {user.role == "teacher" ? (
                                        <>
                                            <LinkContainer to='/students'>
                                                <Nav.Link>Students</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to='/projects'>
                                                <Nav.Link>Projects</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to='/teacher/dashboard'>
                                                <Nav.Link>Dashboard</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to='/studentgroup/create'>
                                                <Nav.Link>Create studentgroup</Nav.Link>
                                            </LinkContainer>
                                        </>
                                    ) : (null)
                                    }
                                    {user.role == "admin" ? (
                                        <>
                                            <LinkContainer to='/admin'>
                                                <Nav.Link>Admin</Nav.Link>
                                            </LinkContainer>
                                        </>
                                    ) : (null)
                                    }
                                    <LinkContainer to='/password/reset'>
                                        <Nav.Link>Reset your password</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/'>
                                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                                    </LinkContainer>
                                </>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar;
