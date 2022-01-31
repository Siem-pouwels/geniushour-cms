import React, { useState, Component, useContext } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from "../UserContext";

export default function StudentDatatable({ data }) {
  const [user, setUser] = useContext(UserContext);

  const deleteUser = (e) => {
    console.log(e.target.value)
    axios.post('http://localhost:8000/api/users/delete/' + e.target.value)
      .then((res) => {
        console.log('Deleted!')
      }).catch((error) => {
        console.log(error)
      })
  }
  const columns = data[0] && Object.keys(data[0]);
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {data[0] && columns.map((heading) => <th>{heading}</th>)}
            <th>&nbsp;&nbsp;&nbsp;✏</th>
            <th>&nbsp;&nbsp;&nbsp;❌</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.map((column) => (
                <td>{row[column]}</td>
              ))}
              {user.isLoggedIn ? (
                <>
                  {user.role == "admin" ? (
                    <>
                      <td><Link to={`/students/${row["id"]}`}><Button variant="warning" value={row['id']}>✏</Button></Link></td>
                      <td><Button variant="danger" value={row['id']} onClick={deleteUser}>❌</Button></td>
                    </>
                  ) : (null)
                  }
                </>
              ) : (null)}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}