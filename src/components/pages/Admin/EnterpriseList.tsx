import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "../../../api/axios";
import { CreatorEntity } from "../../../entity";
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import "./AdminPage.css";

const filters = ["Status", "Active", "Disable"]

const EnterpriseList = () => {
    const [enterprises, setEnterprises] = useState<CreatorEntity[]>([]);
    const [filter, setFilter] = useState<string>(filters[0]);
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');


    useEffect(() => {
        handleFilter();
    }, [filter])

    async function fetchData() {
        await axios.get("/getAllEnterprise").then((res) => {
            setEnterprises(res.data.data.responseList);
        })
    }

    async function handleDisable(id: number) {
        axios.put(`/disable/${id}`).then((res) => {
            const message = res.data.message;
            if (message === "Disable enterprise successfully") {
                fetchData();
                setMessage(message);
                setMessageStatus("green");
            }
        })
    }

    async function handleActive(id: number) {
        axios.patch(`/active/${id}`).then((res) => {
            const message = res.data.message;
            if (message === "Active enterprise successfully") {
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
                setEnterprises(enterprises.filter((e) => e.status === "ACTIVATE"));
                break;
            default:
                setEnterprises(enterprises.filter((e) => e.status === "DISABLE"));
                break;
        }
    }

    const rows = enterprises.map((enterprise) => ({
        id: enterprise.id,
        name: enterprise.name,
        email: enterprise.email,
        phone: enterprise.phone,
        createAt: enterprise.createAt,
        status: enterprise.status,
    }));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.8 },
        { field: "phone", headerName: "Phone", flex: 0.8 },
        { field: "email", headerName: "Email", flex: 0.8 },
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
            <h2>Enterprise</h2>
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

export default EnterpriseList