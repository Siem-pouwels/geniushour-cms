import React, { useEffect, useState } from 'react'
import classes from './Css/Main.module.css'

function DashboardTeacher() {
    const [data, setData] = useState([]);
    fetch('http://localhost:8000/api/projects/teacherdashboard/2')
        .then((response) => response.json())
        .then((json) => setData(json));

    // useEffect(() => {

    // }, [data]);


    {
        data.students && data.students.map(student => {
            console.log(student.id)
        })
    }
    return (
        <>
            <>
                <h1>Dashboard</h1>

                <div className={classes.OverviewDashboard}>
                    Some stats
    </div>
                <br></br>
                <div className={classes.CommentsDashboard}>
                    See the students assigned to you
    </div>
                <div className={classes.StatsDashboard}>
                    Overview of projects
    </div>
                {data.students && data.students.map(student => {
                    <>
                        {student.first_name}
                    </>
                })}
            </>
            <>
                {data.students && data.students.map(student => {
                    <>
                        {student.id}
                    </>
                })}
            </>
        </>
    )
}

export default DashboardTeacher
