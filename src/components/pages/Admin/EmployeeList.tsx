import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "../../../api/axios";
import { EmployeeEntity } from "../../../entity";
import "./AdminPage.css";

const filters = ["Status", "Active", "Disable"]

const EmployeeList = () => {
    const [employees, setEmployees] = useState<EmployeeEntity[]>([]);
    const [filter, setFilter] = useState<string>(filters[0]);


    useEffect(() => {
        handleFilter();
    }, [filter])

    async function fetchData() {
        await axios.get("/employee/getAllEmployees").then((res) => {
            setEmployees(res.data.data.responseList);
        })
    }

    const handleFilter = () => {
        switch (filter) {
            case filters[0]:
                fetchData();
                break;
            case filters[1]:
                setEmployees(employees.filter((e) => e.status === "ACTIVATE"));
                break;
            default:
                setEmployees(employees.filter((e) => e.status === "DISABLE"));
                break;
        }
    }

    const rows = employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        phone: employee.phone,
        createAt: employee.dob,
        status: employee.status,
        position: employee.position.name
    }));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.8 },
        { field: "phone", headerName: "Phone", flex: 0.8 },
        { field: "position", headerName: "Position", flex: 0.8 },
        { field: "createAt", headerName: "Create At", flex: 0.8 },
        {
            field: 'status',
            headerName: '',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                params.row.status == "ACTIVATE" ?
                    <button className="btn-admin-disable" style={{ backgroundColor: "#f44336" }} onClick={() => {
                    }}>
                        DISABLE
                    </button>
                    :
                    <button className="btn-admin-active" style={{ backgroundColor: "#4caf50" }} onClick={() => {
                    }}>
                        ACTIVE
                    </button>
            ),
        }
    ];


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
                <Dropdown className="filter-dropdown ml-8">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>{filter}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        {
                            filters.map((filter, index) => {
                                return (
                                    <Dropdown.Item className='filter-item' key={index} onClick={() => { setFilter(filter) }}>{filter}</Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <button className='btn-search ml-8'>Search</button>
            </div>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={rows}
                    columns={columns}
                    autoPageSize
                    pagination />
            </div>
        </div>
    )
}

export default EmployeeList