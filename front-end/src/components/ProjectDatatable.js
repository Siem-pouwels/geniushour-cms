import React, { useState, Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default class ProjectDatatable extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.deleteProject = this.deleteProject.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.columns = this.props[0] && Object.keys(this.props[0]);
    this.state = {
      show: false,
      lastId: 0,
    }

  }

  handleClose = () => this.setState({ show: false});
  handleShow = () => this.setState({ show: true});

  deleteProject = () => {
    this.setState({ lastId: 1});
    console.log(this.state.lastId)
    axios.post('http://localhost:8000/api/projects/delete/' + this.state.lastId)
        .then((res) => {
            console.log('Deleted!')
        }).catch((error) => {
            console.log(error)
        })
}
render() {
  return (
      <>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          {this.props[0] && this.columns.map((heading) => <th>{heading}</th>)}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {this.props.map((row) => (
          <tr>
            {this.columns.map((column) => (
              <td>{row[column]}</td>
            ))}
            <td><Link to={`/projects/edit/${row["id"]}`}><Button variant="warning" value={row['id']}>Edit</Button></Link></td>
            <td><Button variant="danger" value={row['id']} onClick={this.deleteProject}>Delete</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Modal show={this.state.show} onHide={this.handleClose}>
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
      </Modal>
    </>
  );
            }
}