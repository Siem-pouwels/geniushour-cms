import React from 'react';
import { Table, FormLabel, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './Css/student.module.css';

function ProjectsDetails() {
    return (
        <Table striped bordered hover variant="dark" className={classes.Table}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Project Name</th>
                    <th>Student</th>
                    <th>Comments</th>
                    <th>Estimated hours</th>
                    <th>Given hours</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>RadioGaga</td>
                    <td>Yannick Maas</td>
                    <td>
                        <Table className={classes.Comments}>
                            <thead>
                                <tr>
                                    <th>Comment</th>
                                    <th>Teacher</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Student just started</td>
                                    <td>Peter Nocker</td>
                                    <td>11-01-2022</td>
                                </tr>
                                <tr>
                                    <td>Student finished his project</td>
                                    <td>Peter Nocker</td>
                                    <td>28-01-2022</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Form>
                            <FormLabel>Comment:</FormLabel>
                            <input type="text" placeholder="Write your comment"></input>
                            <FormLabel>Select teacher:</FormLabel>
                            <select name="teachers">
                                <option>Peter Nocker</option>
                                <option>Benjamin Porobic</option>
                            </select>
                            <Button>Submit</Button>
                        </Form>
                    </td>
                    <td><input type="number"></input></td>
                    <td>10</td>
                    <td>Project Finished?<input type="checkbox"></input></td>
                    <td><Button>Delete project</Button></td>
                </tr>
            </tbody>
        </Table>
    )
}

export default ProjectsDetails
