import "./AdminPage.css";
import { useEffect, useState } from "react";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidateResponse } from "../../../entity";
import axios from "../../../api/axios";
import { Button, Dropdown } from "react-bootstrap";

const filters = ["Status", "Active", "Disable"]

const CandidateList = () => {
    const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
    const [filter, setFilter] = useState<string>(filters[0]);


    useEffect(() => {
        handleFilter();
    }, [filter])

    async function fetchData() {
        await axios.get("/candidate/getAll").then((res) => {
            setCandidates(res.data.data);
        })
    }

    const handleFilter = () => {
        switch (filter) {
            case filters[0]:
                fetchData();
                break;
            case filters[1]:
                setCandidates(candidates.filter((e) => e.status === "ACTIVATE"));
                break;
            default:
                setCandidates(candidates.filter((e) => e.status === "DISABLE"));
                break;
        }
    }

    const rows = candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        createAt: candidate.createAt,
        status: candidate.status
    }));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.8 },
        { field: "email", headerName: "Email", flex: 0.8 },
        { field: "phone", headerName: "Phone", flex: 0.8 },
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
            <h2>Candidates</h2>
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

export default CandidateList