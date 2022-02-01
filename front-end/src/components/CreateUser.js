import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from './Css/Main.module.css';
import Select from 'react-select';


export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeAddition = this.onChangeAddition.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.OnChangeRole = this.OnChangeRole.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        // Setting up state
        this.state = {
            first_name: '',
            addition: '',
            surname: '',
            role: '',
            email: '',
        }
    }
    onChangeFirstName = (e) => this.setState({ first_name: e.target.value })
    onChangeAddition = (e) => this.setState({ addition: e.target.value })
    onChangeSurname = (e) => this.setState({ surname: e.target.value })
    OnChangeRole = (e) => this.setState({ role: e.target.value })
    onChangeEmail = (e) => this.setState({ email: e.target.value })
    onSubmit = (e) => {
        e.preventDefault()
        const user = {
            first_name: this.state.name,
            addition: this.state.category,
            surname: this.state.timeSpent,
            role: this.state.timeTotal,
            email: this.state.summary,
        };
        axios.post('http://localhost:8000/api/users/create', user)
            .then(res => console.log(res.data));
        this.setState({ first_name: '', addition: '', surname: '', role: '', email: '' })
    }
    render() {
        return (
            <Card className={classes.CreateProjectCard}>
                <Card.Body>
                    <Card.Title>Create User</Card.Title>
                    <Form onSubmit={this.onSubmit}>
                        <div>
                            <Form.Label>First Name:</Form.Label>
                        </div>
                        <input type="text" value={this.state.first_name} onChange={this.onChangeFirstName} />
                        <br></br>
                        <Form.Label>Addition:</Form.Label>
                        <div>
                            <input type="text" value={this.state.addition} onChange={this.onChangeAddition} />
                            <br></br>
                        </div>
                        <Form.Label>Surname:</Form.Label>
                        <div>
                            <input type="text" value={this.state.surname} onChange={this.onChangeSurname} />
                            <br></br>
                        </div>
                        <Form.Label>Role:</Form.Label>
                        <div>
                            <Select value={this.state.role} />
                            <br></br>
                        </div>
                        <Form.Label>Email:</Form.Label>
                        <div>
                            <input type="text" value={this.state.email} onChange={this.onChangeEmail} />
                            <br></br>
                        </div>
                        <br></br>
                        <Button type="submit">
                            Create User
            </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}