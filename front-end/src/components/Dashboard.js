import React from 'react'
import classes from './Css/Main.module.css'

function Dashboard() {
    return (
        <>
    <h1>Dashboard</h1>

    <div className={classes.OverviewDashboard}>
        Overview of projects
    </div>
    <br></br>
    <div className={classes.CommentsDashboard}>
        Comments
    </div>
    <div className={classes.StatsDashboard}>
        Some stats
    </div>
    </>
    )
}

export default Dashboard
