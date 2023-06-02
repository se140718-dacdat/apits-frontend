import React, { useState, useEffect } from 'react'
import "./ApplyManagement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown } from 'react-bootstrap';
import { Button as ButtonMUI } from '@mui/material';
import { useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { openNewTab } from '../../../../handle';
import axios from '../../../../api/axios';
import { ApplyEntity } from '../../../../Models';
import { Status } from '../../../../model';
import MessageBox from '../../../modules/pagecomponents/Popup/MessageBox/MessageBox';

const AssignStatus = [
    "All",
    "Confirmed",
    "Evaluating",
    "Approve",
    "Reject",
    "Done"
]

const ApplyManagement = () => {
    const user = useSelector((state: any) => state.user.user.user);

    const [select, setSelect] = useState<string>(AssignStatus[0]);
    const [candidates, setCandidates] = useState<ApplyEntity[]>([])
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');

    useEffect(() => {
        fetchData();
        console.log(candidates)
    }, [select])

    const handleLinkClick = (id: number) => {
        openNewTab(`/candidate-detail/${id}`);
    };

    const handleDone = (id: number) => {
        axios.put(`/apply/paymentByEnterprise?applyId=${id}`).then((res) => {
            if (res.data.status === "SUCCESS") {
                fetchData();
                setMessage("Confirm payment successfully!");
                setMessageStatus('green');
            } else {
                setMessage("Confirm payment fail!");
                setMessageStatus('red');
            }
        })
    }


    const fetchData = async () => {
        await axios.get("/apply/getAll").then((res) => {
            if (res.data.status === "SUCCESS") {
                switch (select) {
                    case AssignStatus[1]:
                        setCandidates(res.data.data.responseList.filter((e: ApplyEntity) => e.status === "CONFIRMED"))
                        break;
                    case AssignStatus[2]:
                        setCandidates(res.data.data.responseList.filter((e: ApplyEntity) => e.status === "EVALUATING"))
                        break;
                    case AssignStatus[3]:
                        setCandidates(res.data.data.responseList.filter((e: ApplyEntity) => e.status === "WIN"))
                        break;
                    case AssignStatus[4]:
                        setCandidates(res.data.data.responseList.filter((e: ApplyEntity) => e.status === "REJECTED"))
                        break;
                    case AssignStatus[5]:
                        setCandidates(res.data.data.responseList.filter((e: ApplyEntity) => e.status === "DONE"))
                        break;
                    default:
                        setCandidates(res.data.data.responseList);
                        break;
                }
            }
        })
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "candidateName", headerName: "Candidate", flex: 0.8 },
        { field: "enterpriseName", headerName: "Enterprise", flex: 0.8 },
        {
            field: "recruitment", headerName: "Post", flex: 1.2,
            renderCell: (params) => (
                <a href={`/post-detail/${params.row.recruitmentRequest.id}`}>{params.row.recruitmentRequest.title}</a>
            ),
        },
        { field: "createAt", headerName: "Assign Date", flex: 0.8 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.5,
            width: 170,
            renderCell: (params) => {
                switch (params.row.status) {
                    case "CONFIRMED":
                        return <span style={{ color: `${Status.Studying}`, fontWeight: 700 }}>{params.row.status}</span>
                    case "EVALUATING":
                        return <span style={{ color: `${Status.Processing}`, fontWeight: 700 }}>{params.row.status}</span>
                    case "WIN":
                        return <span style={{ color: `${Status.Done}`, fontWeight: 700 }}>{params.row.status}</span>
                    case "REJECTED":
                    case "FAILURE":
                    case "CANCELED":
                        return <span style={{ color: `${Status.Expired}`, fontWeight: 700 }}>{params.row.status}</span>
                    case "DONE":
                        return <span style={{ color: `${Status.Primary}`, fontWeight: 700 }}>{params.row.status}</span>
                    default:
                        return <span style={{ color: `${Status.NotStarted}`, fontWeight: 700 }}>{params.row.status}</span>
                }
            },
        },
        {
            field: 'detail',
            headerName: '',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <ButtonMUI variant="contained" color="primary" onClick={() => {
                    handleLinkClick(params.row.candidate.id);
                }}>
                    Detail
                </ButtonMUI>
            )

        },
        {
            field: 'payment',
            headerName: 'Payment',
            flex: 0.5,
            width: 170,
            renderCell: (params) => {
                return (params.row.status === "WIN")
                    ? (
                        <ButtonMUI variant="contained" color="success" onClick={() => {
                            handleDone(params.row.item.id);
                        }}>
                            Paid
                        </ButtonMUI>
                    )
                    : (params.row.status === "DONE")
                        ?
                        (
                            <span style={{ color: Status.Done, fontWeight: 700 }}>Paid</span>
                        )
                        :
                        (<span style={{ color: Status.NotStarted, fontWeight: 700 }}>Not yet</span>)
            }

        },
    ];

    const rows = candidates?.length > 0 ? candidates?.map((candidate) => ({
        item: candidate,
        id: candidate.id,
        candidateName: candidate.candidate.name,
        enterpriseName: candidate.recruitmentRequest.creator.name,
        candidate: candidate.candidate,
        createAt: candidate.createAt,
        status: candidate.status,
        recruitmentRequest: candidate.recruitmentRequest
    })) : [];

    return (
        <div id='ApplyManagement'>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
            <h2>Candidate</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <Dropdown className="filter-dropdown ml-8">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>{select}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        {
                            AssignStatus.map((status: string, index) => {
                                return (
                                    <div key={index}>
                                        <Dropdown.Item className='filter-item' onClick={() => {
                                            setSelect(status);
                                        }}>{status}</Dropdown.Item>
                                    </div>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <button className='btn-search ml-8'>Search</button>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoPageSize
                    pagination
                />
            </div>
        </div>
    )
}

export default ApplyManagement