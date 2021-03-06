import React, { useState, Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default function ProjectDatatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProject = (e) => {
    console.log(e.target.value)
    axios.post('http://localhost:8000/api/projects/delete/' + e.target.value)
      .then((res) => {
        console.log('Deleted!')
      }).catch((error) => {
        console.log(error)
      })
  }
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
              <td><Link to={`/projects/edit/${row["id"]}`}><Button variant="warning" value={row['id']}>✏</Button></Link></td>
              <td><Button variant="danger" value={row['id']} onClick={handleShow}>❌</Button></td>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kijk uit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Yoo makker, witte zeker da ge di moi projectje wil wegknikkeren?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" value={row['id']} onClick={deleteProject}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}