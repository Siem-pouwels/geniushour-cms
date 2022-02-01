import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, Form, FormCheck, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import classes from './Css/student.module.css';
import Datatable from './ProjectDatatable';

function ProjectsOverview() {
  const [user, setUser] = useContext(UserContext);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'name',
    'category',
  ]);

  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <Container>
      <input
        type='text'
        value={q}
        placeholder='🔎Search...'
        onChange={(e) => setQ(e.target.value)}
      />

      {user.role === "teacher" ? (
        <>
          <Link to={'/projects/create'}><Button>Create Project</Button></Link>
        </>
      ) : (null)
      }
      <Form className={classes.FilterBoxes}>
        {columns &&
          columns.map((column) => (
            <FormGroup className={classes.FilterBox}>
              <FormCheck
                label={column}
                type='checkbox'
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column],
                  );
                }}
              ></FormCheck>
            </FormGroup>
          ))}
      </Form>
      <Datatable data={search(data)} />
    </Container>
  );
}

export default ProjectsOverview
