import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function ProjectsDetails() {
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
    axios.get(`http://localhost:8000/api/projects/${id}`)
      .catch((error) => {
        console.log(error);
      })
      //gets the graphics by id
  })

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
        navigate('/projects');
      }).catch((error) => {
        console.log(error)
      })
      //imports into backend
  }



    return (
      <Form onSubmit={onSubmit}>
          <Form.Label>Name</Form.Label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <Form.Label>Category</Form.Label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
          <Form.Label>Time Spent</Form.Label>
          <input type="text" value={timeSpent} onChange={e => setTimeSpent(e.target.value)} />
          <Form.Label>Time Total</Form.Label>
          <input type="text" value={timeTotal} onChange={e => setTimeTotal(e.target.value)} />
          <Form.Label>Summary</Form.Label>
          <input type="text" value={summary} onChange={e => setSummary(e.target.value)} />
        <Button type="submit">
          Update Project
        </Button>
      </Form>
    );
}
export default ProjectsDetails;