import React from 'react';
import { Table, Button } from 'react-bootstrap';
import classes from './Css/student.module.css';

function StudentsDetails() {
    return (
        <div>
            <div className={classes.StudentDetails}>
            <div className={classes.StudentName}>
            <label>Name:</label>
            <h4>Yannick Maas</h4>
            </div>
            <div className={classes.StudentNumber}>
            <label>StudentNumber:</label>
            <h4>82997</h4>
            </div>
            <div className={classes.StudentClass}>
            <label>Class:</label>
            <h4>IC19AOe</h4>
            </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <label className={classes.ProjectsLabel}>All Projects:</label>
            <Table variant="dark" className={classes.Table}>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Given Hours</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>RadioGaga</td>
                    <td>Webdevelopment</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Living colors</td>
                    <td>EBSY</td>
                    <td>15</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default StudentsDetails
