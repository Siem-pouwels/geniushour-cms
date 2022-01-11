import React, { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import classes from './Css/Main.module.css';
import axios from 'axios'
import Cookies from 'js-cookie';

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setpasswordConfirmation] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const user = { name: name, email: email, password: password, password_confirmation: passwordConfirmation };
        axios.post('http://localhost:8000/api/signup', user).then(function (response) {
            if (!Cookies.get('Bearertoken') || Cookies.get('Bearertoken') === "") {
                Cookies.set('Bearertoken', response.data.token, { path: '/' });
                Cookies.set('Role', response.data.user.role, { path: '/' });
            }
        })

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Cookies.get('Bearertoken')
        }
    }
    return (
        <Card className={classes.SignUpCard}>
            <Card.Body >
                <Card.Title>SignUp</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={passwordConfirmation}
                            onChange={e => setpasswordConfirmation(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        SignUp
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    );
}