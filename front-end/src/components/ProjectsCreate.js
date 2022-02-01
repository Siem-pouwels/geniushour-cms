import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Card } from "react-bootstrap";
import classes from './Css/Main.module.css';


export default class ProjectsCreate extends Component {
  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTimeTotal = this.onChangeTimeTotal.bind(this);
    this.onChangeSummary = this.onChangeSummary.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      category: '',
      timeTotal: '',
      summary: '',
    }
  }
  onChangeName = (e) => this.setState({ name: e.target.value })
  onChangeCategory = (e) => this.setState({ category: e.target.value })
  onChangeTimeTotal = (e) => this.setState({ timeTotal: e.target.value })
  onChangeSummary = (e) => this.setState({ summary: e.target.value })
  onSubmit = (e) => {
    e.preventDefault()
    const project = {
      name: this.state.name,
      category: this.state.category,
      timeTotal: this.state.timeTotal,
      summary: this.state.summary,
    };
    axios.post('http://localhost:8000/api/projects/create', project)
      .then(res => console.log(res.data));
    this.setState({ name: '', category: '', timeTotal: '', summary: '' })
  }
  render() {
    return (
      <Card className={classes.CreateProjectCard}>
        <Card.Body>
          <Card.Title>Create Project</Card.Title>
          <Form onSubmit={this.onSubmit}>
            <div>
              <Form.Label>Name:</Form.Label>
            </div>
            <input type="text" value={this.state.name} onChange={this.onChangeName} />
            <br></br>
            <Form.Label>Category:</Form.Label>
            <div>
              <input type="text" value={this.state.category} onChange={this.onChangeCategory} />
              <br></br>
            </div>
            <Form.Label>Time Total:</Form.Label>
            <div>
              <input type="number" value={this.state.timeTotal} onChange={this.onChangeTimeTotal} />
              <br></br>
            </div>
            <Form.Label>Summary:</Form.Label>
            <div>
              <input type="text" value={this.state.summary} onChange={this.onChangeSummary} />
              <br></br>
            </div>
            <br></br>
            <Button type="submit">
              Create Project
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}