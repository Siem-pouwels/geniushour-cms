import React, { useState, useEffect } from 'react';
import { FormGroup, Form, FormCheck, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './Css/student.module.css';


import Datatable from './StudentDatatable';

function StudentsOverview() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'surname',
    'created_at',
  ]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users/students')
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
        <div>
          
          {/* <Link to={'/projects/create'}><Button>Create Project</Button></Link> */}

        <div>
          <input
            type='text'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
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
        </div>
        <div>
          <Datatable data={search(data)} />
        </div>
      </div>
    );
}

export default StudentsOverview
