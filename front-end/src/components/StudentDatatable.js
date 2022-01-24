import React, { useState, Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default function StudentDatatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

//   const deleteProject = (e) => {
//     console.log(e.target.value)
//     axios.post('http://localhost:8000/api/projects/delete/' + e.target.value)
//         .then((res) => {
//             console.log('Deleted!')
//         }).catch((error) => {
//             console.log(error)
//         })
// }
  return (
      <>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          {data[0] && columns.map((heading) => <th>{heading}</th>)}
          {/* <th>Edit</th>
          <th>Delete</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}

            {/* <td><Link to={`/projects/edit/${row["id"]}`}><Button variant="warning" value={row['id']}>Edit</Button></Link></td> */}
            {/* <td><Button variant="danger" value={row['id']} onClick={deleteProject}>Delete</Button></td> */}
          </tr>
        ))}
      </tbody>
    </Table>
    {/* <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.deleteProject}>
            Yes
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}