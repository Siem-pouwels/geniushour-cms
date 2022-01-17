import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default class ProjectsCreate extends Component {
    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeTimeSpent = this.onChangeTimeSpent.bind(this);
        this.onChangeTimeTotal = this.onChangeTimeTotal.bind(this);
        this.onChangeSummary = this.onChangeSummary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        // Setting up state
        this.state = {
            name: '',
            category: '',
            timeSpent: '',
            timeTotal: '',
            summary: '',
        }
      }
      onChangeName(e) {
        this.setState({name: e.target.value})
      }
      onChangeCategory(e) {
        this.setState({category: e.target.value})
      }
      onChangeTimeSpent(e) {
        this.setState({timeSpent: e.target.value})
      }
      onChangeTimeTotal(e) {
        this.setState({timeTotal: e.target.value})
      }
      onChangeSummary(e) {
        this.setState({summary: e.target.value})
      }
      onSubmit(e) {
        e.preventDefault()
         const project = {
            name: this.state.name,
            category: this.state.category,
            timeSpent: this.state.timeSpent,
            timeTotal: this.state.timeTotal,
            summary: this.state.summary,
        };
        axios.post('http://localhost:8000/api/projects/create', project)
          .then(res => console.log(res.data));
          this.setState({name: '', category: '', timeSpent: '', timeTotal: '', summary: ''})
 }
 render() {
    return (
        <Form onSubmit={this.onSubmit}>
        <Form.Label>Name</Form.Label>
        <input type="text" value={this.state.name} onChange={this.onChangeName} />
        <Form.Label>Category</Form.Label>
        <input type="text" value={this.state.category} onChange={this.onChangeCategory} />
        <Form.Label>Time Spent</Form.Label>
        <input type="number" value={this.state.timeSpent} onChange={this.onChangeTimeSpent} />
        <Form.Label>Time Total</Form.Label>
        <input type="number" value={this.state.timeTotal} onChange={this.onChangeTimeTotal} />
        <Form.Label>Summary</Form.Label>
        <input type="text" value={this.state.summary} onChange={this.onChangeSummary} />
      <Button type="submit">
        Create Project
      </Button>
    </Form>
    );
}
}