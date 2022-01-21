import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Form, Button, Card } from "react-bootstrap";
import classes from './Css/Main.module.css';

function ProjectsDetails() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {id} = useParams();
  let navigate = useNavigate();
  //brings the param from the route

        // Setting up state
        const [name,setName] = useState('');
        const [category,setCategory] = useState('');
        const [timeSpent,setTimeSpent] = useState('');
        const [timeTotal,setTimeTotal] = useState('');
        const [summary,setSummary] = useState('');

  useEffect(() => {
    console.log("hihi");
    axios.get(`http://localhost:8000/api/projects/${id}`)
    .then((res) => {
      console.log(res.data)
      setName(res.data.name);
      setCategory(res.data.category);
      setTimeSpent(res.data.timeSpent);
      setTimeTotal(res.data.timeTotal);
      setSummary(res.data.summary);
    }).catch((error) => {
        console.log(error);
      })
      //gets the graphics by id
  },[])

  const OnChangeName = (e) => {
    setName(e.target.value);
  }

  const OnChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  const OnChangeTimeSpent = (e) => setTimeSpent(e.target.value);
  

  const OnChangeTimeTotal = (e) => {
    setTimeTotal(e.target.value);
  }

  const OnChangeSummary = (e) => {
    setSummary(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const projectObject = {
        name, category, timeSpent, timeTotal, summary
    }
    //makes the value into object
    console.log(projectObject);

    axios.post(`http://localhost:8000/api/projects/edit/${id}`, projectObject)
      .then((res) => {
        console.log(res.data)
        console.log('Project successfully updated')
        enqueueSnackbar('Project updated succesfully!', {
          variant: 'success'
        });
        navigate('/projects');
      }).catch((error) => {
        console.log(error)
        enqueueSnackbar('Something went wrong...', {
          variant: 'error'
        });
      })
      //imports into backend
  }



    return (
      <>
      <Card className={classes.CreateProjectCard}>
      <Card.Body>
          <Card.Title>Edit Project</Card.Title>
      <Form onSubmit={onSubmit}>
        <div>
          <Form.Label>Name</Form.Label>
          </div>
          <input type="text" value={name} onChange={OnChangeName} />
          <br></br>
          <div>
          <Form.Label>Category</Form.Label>
          </div>
          <input type="text" value={category} onChange={OnChangeCategory} />
          <br></br>
          <div>
          <Form.Label>Time Spent</Form.Label>
          </div>
          <input type="number" value={timeSpent} onChange={OnChangeTimeSpent} />
          <br></br>
          <div>
          <Form.Label>Time Total</Form.Label>
          </div>
          <input type="number" value={timeTotal} onChange={OnChangeTimeTotal} />
          <br></br>
          <div>
          <Form.Label>Summary</Form.Label>
          </div>
          <input type="text" value={summary} onChange={OnChangeSummary} />
          <br></br>
          <br></br>
        <Button type="submit">
          Update Project
        </Button>
      </Form>
      </Card.Body>
    </Card>
    </>
    );
}
export default ProjectsDetails;