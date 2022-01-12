import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './Css/student.module.css';

function ProjectsOverview() {
    return (
        <Table striped bordered hover variant="dark" className={classes.Table}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>Summary</th>
                    <th>Students assigned to it</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>
                    <Link to='/projects/1'>
                        RadioGaga
                    </Link>
                    </td>
                    <td>Webdevelopment</td>
                    <td>Make your own radio station</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>
                    <Link to='/projects/1'>
                        Fietsverlichting
                    </Link>
                    </td>
                    <td>EBSY</td>
                    <td>Program your arduino to the use of a bike light</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>
                    <Link to='/projects/1'>
                        Elevator
                    </Link>
                    </td>
                    <td>INAU</td>
                    <td>Program an elevator</td>
                    <td>2</td>
                </tr>
            </tbody>
            <br></br>
            <Button className={classes.AddProjectBtn}>Add new project</Button>
        </Table>
        
    )
}

export default ProjectsOverview
