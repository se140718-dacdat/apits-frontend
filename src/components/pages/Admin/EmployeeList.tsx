import React, { useEffect, useState } from 'react'
import "./AdminPage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import { Employee } from '../../../model';
import { getAllEmployee, getPostByPostId } from '../../../redux/apiRequest';
import axios from '../../../api/axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        fetchData();
        console.log(employees)
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get<{ data: { responseList: Employee[] } }>("/employee/getAllEmployees")
            setEmployees(res.data.data.responseList);
        } catch (error) {
            return error
        }
    }

    return (
        <div id='AdminPage'>
            <h2>Employees</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <button className='btn-search ml-8'>Search</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>Code</th>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "15%" }}>Phone</th>
                        <th style={{ width: "15%" }}>Position</th>
                        <th style={{ width: "5%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.length > 0 && employees.map((employee: Employee, index) => {
                            return (
                                <tr>
                                    <td>
                                        {employee.employeeCode}
                                    </td>
                                    <td>
                                        {employee.employeeName}
                                    </td>
                                    <td>
                                        {employee.phone}
                                    </td>
                                    <td>
                                        {employee.position.name}
                                    </td>
                                    <td>
                                        <button className='btn-delete' onClick={() => { 
                                            // setEdditing("") 
                                            }}>Disable</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default EmployeeList