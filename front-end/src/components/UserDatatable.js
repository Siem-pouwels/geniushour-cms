import React from 'react';
import { Table } from 'react-bootstrap';
import Environment from '../Environment';
import 'bootstrap/dist/css/bootstrap.css';

export default function UserDatatable({ data }) {
    const columns = data[0] && Object.keys(data[0]);

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {data[0] && columns.map((heading) => <th>{heading}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr>
                            {columns.map((column) => (
                                <td>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}