import React from 'react'
import classes from './Css/Main.module.css'

function DashboardStudent() {
    return (
        <>
    <h1>Dashboard</h1>

    <div className={classes.OverviewDashboard}>
        ?
    </div>
    <br></br>
    <div className={classes.CommentsDashboard}>
        Comments
    </div>
    <div className={classes.StatsDashboard}>
        Overview of projects
    </div>
    </>
    )
}

export default DashboardStudent
