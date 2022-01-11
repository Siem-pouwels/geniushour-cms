import React, { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import classes from './Css/Main.module.css';
import axios from 'axios'
import Cookies from 'js-cookie';
import Environment from '../Environment';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const env = new Environment;

    function handleSubmit(event) {
        event.preventDefault();
        const user = { email: email, password: password };
        axios.post(env.baseUrl + 'login', user).then(function (response) {
            Cookies.set('Bearertoken', response.data.token);
            Cookies.set('Role', response.data.user.role);
        }, (error) => {
            console.log(error);
        });
    }
    return (
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
                    <Button className={classes.BtnPrimary} variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    );
}