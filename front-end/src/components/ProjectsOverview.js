import React, { useState, useEffect } from 'react';
import { FormGroup, Form, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './Css/student.module.css';

import Datatable from './ProjectDatatable';

function ProjectsOverview() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'name',
    'created_at',
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
        <div>
        <div>
          <input
            type='text'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
              <Form className='d-flex'>
              {columns &&
                columns.map((column) => (
                  <FormGroup>
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

export default ProjectsOverview
