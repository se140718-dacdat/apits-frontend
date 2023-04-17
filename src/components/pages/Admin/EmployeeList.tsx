import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import axios from "../../../api/axios";
import { EmployeeEntity, SpecialtyResponse } from "../../../entity";
import "./AdminPage.css";
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import { PositionResponse } from '../../../model';

const filters = ["Status", "Active", "Disable"]

const EmployeeList = () => {
    const [employees, setEmployees] = useState<EmployeeEntity[]>([]);
    const [positions, setPositions] = useState<PositionResponse[]>([]);
    const [position, setPosition] = useState<PositionResponse>();
    const [specialties, setSpecialties] = useState<SpecialtyResponse[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyResponse>();
    const [filter, setFilter] = useState<string>(filters[0]);
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');



    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => { setShowCreate(true) };



    useEffect(() => {
        handleFilter();
        getPositions();
        getSpecialties();
    }, [filter])

    async function fetchData() {
        await axios.get("/employee/getAllEmployees?pageNo=0&pageSize=20").then((res) => {
            setEmployees(res.data.data.responseList);
        })
        await axios.get("/position/getAllPosition").then((res) => {
            setPositions(res.data.data.responseList);
            setPosition(res.data.data.responseList[0]);
        })
        await axios.get("/specialty/getAll").then((res) => {
            setSpecialties(res.data.data);
            setSpecialty(res.data.data[0]);
        })
    }
    async function getPositions() {
        await axios.get("/position/getAllPosition").then((res) => {
            setPositions(res.data.data.responseList);
            setPosition(res.data.data.responseList[0]);
        })
    }

    async function getSpecialties() {
        await axios.get("/specialty/getAll").then((res) => {
            setSpecialties(res.data.data);
            setSpecialty(res.data.data[0]);
        })
    }


    const handleCreate = async () => {
        const request = {
            name: username,
            phone: phone,
            address: address,
            positionName: position?.name
        }

        await axios.post("/account/createEmployee", request).then(async (res) => {
            const message = res.data.message;
            if (message === "Create employee successfully") {
                const id = res.data.data.employee.id;
                fetchData();
                handleCloseCreate();
                setMessage(message);
                setMessageStatus("green");
                if(request.positionName === "PROFESSOR") {
                    await axios.get(`/employee-specialty/create?employeeId=${id}&specialtyId=${specialty?.id}`);
                }
            }
        })
    }


    async function handleDisable(id: number) {
        axios.put(`/employee/disable/${id}`).then((res) => {
            const message = res.data.message;
            if (message === "Disable employee successfully") {
                fetchData();
                setMessage(message);
                setMessageStatus("green");
            }
        })
    }

    async function handleActive(id: number) {
        axios.patch(`/employee/active/${id}`).then((res) => {
            const message = res.data.message;
            if (message === "Active employee successfully") {
                fetchData();
                setMessage(message);
                setMessageStatus("green");
            }
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
                        handleDisable(params.row.id);
                    }}>
                        DISABLE
                    </button>
                    :
                    <button className="btn-admin-active" style={{ backgroundColor: "#4caf50" }} onClick={() => {
                        handleActive(params.row.id);
                    }}>
                        ACTIVE
                    </button>
            ),
        }
    ];


    return (
        <div id='AdminPage'>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
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
            <button className="btn float-right mt-24" onClick={() => { handleShowCreate() }}>Create New Employee</button>
            <Modal id="EmployeeCreateModal" show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="create-container">
                        <div className="group-input">
                            <label>Username:</label>
                            <div className="form-input">
                                <input type="Username" className="input regis-input" placeholder="Username" required onChange={(e) => { setUsername(e.target.value) }} />
                                <span className="text-err"></span>
                            </div>
                        </div>
                        <div className="group-input">
                            <label>Phone:</label>
                            <div className="form-input">
                                <input type="Phone" className="input regis-input" placeholder="Phone" required onChange={(e) => { setPhone(e.target.value) }} />
                                <span className="text-err"></span>
                            </div>
                        </div>
                        <div className="group-input">
                            <label>Address:</label>
                            <div className="form-input">
                                <input type="Address" className="input regis-input" placeholder="Address" required onChange={(e) => { setAddress(e.target.value) }} />
                                <span className="text-err"></span>
                            </div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                                <span>{position?.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='filter-menu'>
                                {
                                    positions.map((position, index) => {
                                        return (
                                            <Dropdown.Item className='filter-item' key={index} onClick={() => { setPosition(position) }}>{position.name}</Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        {
                            position?.name === "PROFESSOR"
                                ? <Dropdown className='mt-24'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                                        <span>{specialty?.name}</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='filter-menu'>
                                        {
                                            specialties.map((specialty, index) => {
                                                return (
                                                    <Dropdown.Item className='filter-item' key={index} onClick={() => { setSpecialty(specialty) }}>{specialty.name}</Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                                : null
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseCreate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleCreate() }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EmployeeList