import React, { useState, useEffect } from 'react'
import "./EnterpriseCandidate.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown } from 'react-bootstrap';
import { Button as ButtonMUI } from '@mui/material';
import axios from '../../../api/axios';
import { useSelector } from 'react-redux';
import { ApplyResponse } from '../../../Models';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Status } from '../../../model';
import { openNewTab } from '../../../handle';

const AssignStatus = [
    "All",
    "Confirmed",
    "Evaluating",
    "Approve",
    "Reject",
    "Done"
]

const EnterpriseCandidate = () => {
    const user = useSelector((state: any) => state.user.user.user);

    const [select, setSelect] = useState<string>(AssignStatus[0]);
    const [candidates, setCandidates] = useState<ApplyResponse[]>([])

    useEffect(() => {
        fetchData();
    }, [select])

    const handleLinkClick = (id: number) => {
        openNewTab(`/candidate-detail/${id}`);
    };


    const fetchData = async () => {
        await axios.get(`/apply/getListAssignByEnterpriseId?enterpriseId=${user?.id}`).then((res) => {
            if (res.data.status === "SUCCESS") {
                switch (select) {
                    case AssignStatus[1]:
                        setCandidates(res.data.data.filter((e: ApplyResponse) => e.status === "CONFIRMED"))
                        break;
                    case AssignStatus[2]:
                        setCandidates(res.data.data.filter((e: ApplyResponse) => e.status === "EVALUATING"))
                        break;
                    case AssignStatus[3]:
                        setCandidates(res.data.data.filter((e: ApplyResponse) => e.status === "WIN"))
                        break;
                    case AssignStatus[4]:
                        setCandidates(res.data.data.filter((e: ApplyResponse) => e.status === "REJECTED"))
                        break;
                    case AssignStatus[5]:
                        setCandidates(res.data.data.filter((e: ApplyResponse) => e.status === "DONE"))
                        break;
                    default:
                        setCandidates(res.data.data);
                        break;
                }
            }
        })
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "candidateName", headerName: "Candidate", flex: 0.8 },
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
                    case "DONE":
                        return <span style={{ color: `${Status.Primary}`, fontWeight: 700 }}>{params.row.status}</span>
                    case "REJECTED":
                    case "FAILURE":
                    case "CANCELED":
                        return <span style={{ color: `${Status.Expired}`, fontWeight: 700 }}>{params.row.status}</span>
                    default:
                        return <span style={{ color: `${Status.NotStarted}`, fontWeight: 700 }}>{params.row.status}</span>
                }
            },
        },

        {
            field: 'payment',
            headerName: 'Payment',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                (params.row.payment) ?
                    <span>Paid</span>
                    : <span>Not yet</span>
            ),
        },
        // {
        //     field: 'handle',
        //     headerName: '',
        //     flex: 1,
        //     width: 170,
        //     renderCell: (params) => {
        //         switch (params.row.status) {
        //             case "EVALUATING":
        //                 return (
        //                     <div>
        //                         <ButtonMUI variant="contained" style={{marginRight: "24px"}} color="error">
        //                             Fail
        //                         </ButtonMUI>
        //                         <ButtonMUI variant="contained" color="success">
        //                             Pass
        //                         </ButtonMUI>
        //                     </div>
        //                 )
        //             case "WIN":
        //                 return (
        //                     <div>
        //                         <ButtonMUI variant="contained" color="info">
        //                             Contract
        //                         </ButtonMUI>
        //                     </div>
        //                 )
        //             default:
        //                 return (
        //                     <div>
        //                         <ButtonMUI variant="contained" style={{marginRight: "24px"}} color="error">
        //                             Reject
        //                         </ButtonMUI>
        //                         <ButtonMUI variant="contained" color="success">
        //                             Approve
        //                         </ButtonMUI>
        //                     </div>
        //                 )
        //         }
        //     }
        // },
        {
            field: 'detail',
            headerName: '',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={() => {
                    handleLinkClick(params.row.candidate.id)
                }
                }>
                    Detail
                </Button>
            ),
        },
    ];

    const rows = candidates?.length > 0 ? candidates?.map((candidate) => ({
        item: candidate,
        id: candidate.applyId,
        candidateName: candidate.candidate.name,
        candidate: candidate.candidate,
        createAt: candidate.createAt,
        status: candidate.status,
        payment: candidate.payment,
        recruitmentRequest: candidate.recruitmentRequest
    })) : [];

    return (
        <div id='EnterpriseCandidate'>
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

export default EnterpriseCandidate