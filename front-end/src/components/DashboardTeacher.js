import React from 'react'
import classes from './Css/Main.module.css'

function DashboardTeacher() {
    return (
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
    </>
    )
}

export default DashboardTeacher
