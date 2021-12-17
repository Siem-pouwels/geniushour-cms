import React, { Component, useState, SyntheticEvent } from "react";
import { Form, FormGroup, FormLabel, FormText, FormControl, Button, Container, Card } from 'react-bootstrap';
import classes from './Css/Main.module.css';
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const user = { email: email, password: password };
        axios.post('http://localhost:8000/api/login', user, {
            authentication: 'include'
        })
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
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    );
}