import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container, Row, Col, FormGroup, FormCheck } from 'react-bootstrap';
import { useNavigate } from "react-router";
import Papa from 'papaparse'
import axios from 'axios';
import Environment from '../Environment';
import { UserContext } from "../UserContext";
import { notification } from "notistack";
import classes from './Css/student.module.css';
import Datatable from './StudentDatatable';

function Admin() {
    const [user, setUser] = useContext(UserContext);
    const [jsonFiles, setjsonFiles] = useState("");
    const env = new Environment;
    let navigate = useNavigate();
    const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'surname',
    'created_at',
  ]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
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
        axios.post('http://localhost:8000/api/users/csvUpload', jsonFiles).then(function (response) {
            console.log(response)
            fetch('http://localhost:8000/api/users')
                .then((response) => response.json())
                .then((json) => setData(json));
        }).catch(error => {
            console.log(error)
        })
    }

    const columns = data[0] && Object.keys(data[0]);
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
            <div>
          <input
            type='text'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
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
        </div>
        <div>
          <Datatable data={search(data)} />
        </div>
        </>
    )
}
export default Admin