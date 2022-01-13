import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './Css/student.module.css';

function StudentsOverview() {
    return (
        <Table striped bordered hover variant="dark" className={classes.Table}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Assigned projects</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>82997</td>
                    <td>
                    <Link to='/students/1'>
                        Yannick Maas
                    </Link>
                    </td>
                    <td>IC19AOe</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>83349</td>
                    <td>
                    <Link to='/students/1'>
                        Tim van Kol
                    </Link>
                    </td>
                    <td>IC19AOe</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>84181</td>
                    <td>
                    <Link to='/students/1'>
                        Siem Pouwels
                    </Link>
                    </td>
                    <td>IC19AOe</td>
                    <td>2</td>
                </tr>
            </tbody>
        </Table>
        
    )
}

export default StudentsOverview
