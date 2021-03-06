import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router";
import classes from './Css/Main.module.css';
import axios from 'axios'
import Cookies from 'js-cookie';
import Environment from '../Environment';
import { UserContext } from "../UserContext";
import { useSnackbar } from 'notistack';

function Login() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const env = new Environment;
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const user = { email: email, password: password };
        axios.post(env.baseUrl + 'login', user).then(function (response) {
            Cookies.set('Bearertoken', response.data.token);
            Cookies.set('Role', response.data.user.role);
            setUser({
                role: Cookies.get("Role"),
                isLoggedIn: true
            });
            enqueueSnackbar('Succesfully logged in!', {
                variant: 'success'
            });
            navigate('/')
        }).catch(function (error) {
            enqueueSnackbar(error.response.data.message, {
                variant: 'error'
            })
        });
    }
    return (
        <>
            {!user.isLoggedIn ? (
                <Card className={classes.LoginCard}>
                    <Card.Body >
                        <Card.Title>Login</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button className={classes.OrangeBtn} variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card >
            ) : (navigate('/'))
            }
        </>
    )
}
export default Login