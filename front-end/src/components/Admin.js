import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router";
import Papa from 'papaparse'
import axios from 'axios';
import Environment from '../Environment';
import { UserContext } from "../UserContext";
import { notification } from "notistack";

function Admin() {
    const [user, setUser] = useContext(UserContext);
    const [jsonFiles, setjsonFiles] = useState("");
    const env = new Environment;
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/csvUpload', jsonFiles).then(function (response) {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            {user.isLoggedIn ? (
                <>
                    {user.role == "admin" ? (
                        <>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx,.xls"
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (files) {
                                                Papa.parse(files[0], {
                                                    complete: function (results) {
                                                        setjsonFiles(results.data)
                                                    }
                                                }
                                                )
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Add users
                                </Button>
                            </Form>
                        </>
                    ) : (null)
                    }
                </>
            ) : (null)}
        </>
    )
}
export default Admin