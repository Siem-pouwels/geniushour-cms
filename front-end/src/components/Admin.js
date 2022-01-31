import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, FormGroup, FormCheck, FormControl } from 'react-bootstrap';
import { useNavigate } from "react-router";
import Papa from 'papaparse'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Environment from '../Environment';
import { UserContext } from "../UserContext";
import { useSnackbar } from 'notistack';
import classes from './Css/student.module.css';
import Datatable from './UserDatatable';

export default function Admin() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [user, setUser] = useContext(UserContext);
    const [users, setUsers] = useState("");
    const env = new Environment;
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [q, setQ] = useState('');
    const [searchColumns, setSearchColumns] = useState([
        'student_number',
        'first_name',
        'surname',
    ]);

    useEffect(() => {
        fetch(env.baseUrl + 'users')
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    function search(rows) {
        return rows.filter((row) =>
            searchColumns.some(
                (column) =>
                    row[column]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1,
            ),
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!users) {
            enqueueSnackbar('Upload a file to add users', {
                variant: 'warning'
            });
            return
        }
        axios.post(env.baseUrl + 'users/csvUpload', users).then(function (response) {
            fetch(env.baseUrl + '/users')
                .then((response) => response.json())
                .then((json) => {
                    setData(json)
                    enqueueSnackbar(response.data.message, {
                        variant: 'succes'
                    });
                });
        }).catch(error => {
            enqueueSnackbar("Something went wrong", {
                variant: 'error'
            });
        })
    }

    const columns = data[0] && Object.keys(data[0]);
    return (
        <Container>
            {user.isLoggedIn ? (
                <>
                    {user.role == "admin" ? (
                        <Container>
                            <Container className={classes.CsvImportContainer}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <FormControl
                                            type="file"
                                            accept=".csv,.xlsx,.xls"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (files) {
                                                    Papa.parse(files[0], {
                                                        complete: function (results) {
                                                            setUsers(results.data)
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
                                <br></br>
                            </Container>

                            <Container>
                                <input
                                    type='text'
                                    value={q}
                                    placeholder='🔎Search...'
                                    onChange={(e) => setQ(e.target.value)}
                                />
                                <Link to={'/users/create'}><Button>Create User</Button></Link>

                                <Form className={classes.FilterBoxes}>
                                    {columns &&
                                        columns.map((column) => (
                                            <FormGroup className={classes.FilterBox}>
                                                <FormCheck
                                                    label={column}
                                                    type='checkbox'
                                                    checked={searchColumns.includes(column)}
                                                    onChange={(e) => {
                                                        const checked = searchColumns.includes(column);
                                                        setSearchColumns((prev) =>
                                                            checked
                                                                ? prev.filter((sc) => sc !== column)
                                                                : [...prev, column],
                                                        );
                                                    }}
                                                ></FormCheck>
                                            </FormGroup>
                                        ))}
                                </Form>
                                <Datatable data={search(data)} />
                            </Container>
                        </Container>
                    ) : (null)
                    }
                </>
            ) : (null)
            }
        </Container >
    )
}