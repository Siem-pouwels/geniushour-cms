import React, { useState, useContext } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router";
import classes from './Css/Main.module.css';
import axios from 'axios'
import Cookies from 'js-cookie';
import Environment from '../Environment';
import { UserContext } from "../UserContext";
import { useSnackbar } from 'notistack';

export default function PasswordReset() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [user, setUser] = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirm] = useState("");

    const env = new Environment;
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        if (password != password_confirmation) {
            enqueueSnackbar("The passwords have to match", {
                variant: 'error'
            });
            return;
        }
        axios.post(env.baseUrl + 'users/password-reset', { password, password_confirmation }).then(function (response) {
            Cookies.remove('Bearertoken');
            Cookies.remove('Role');
            setUser({ role: null, isLoggedIn: false });
            enqueueSnackbar(response.data.message, {
                variant: 'success'
            });
            navigate('/login')
        }).catch(function (error) {
            enqueueSnackbar(error.response.data.password, {
                variant: 'error'
            })
        });
    }


    return (<>
        {user.isLoggedIn ? (
            <Card className={classes.LoginCard}>
                <Card.Body >
                    <Card.Title>Reset password</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                autoFocus
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password confirm</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={password_confirmation}
                                onChange={e => setPasswordConfirm(e.target.value)}
                            />
                        </Form.Group>

                        <Button className={classes.BtnPrimary} variant="primary" type="submit">
                            Change password
                        </Button>
                    </Form>
                </Card.Body>
            </Card >
        ) : (navigate('/login'))
        }
    </>);
}
