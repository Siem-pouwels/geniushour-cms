import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router";
import classes from './Css/Main.module.css';
import axios from 'axios'
import Cookies from 'js-cookie';
import Environment from '../Environment';
import { UserContext } from "../UserContext";

function Admin() {
    const [user, setUser] = useContext(UserContext);
    const env = new Environment;
    let navigate = useNavigate();
    return (
        <>
            {user.isLoggedIn ? (
                <>
                    {user.role == "admin" ? (
                        <>
                            You are in the admin
                        </>
                    ) : (null)
                    }
                </>
            ) : (null)}
        </>
    )
}
export default Admin