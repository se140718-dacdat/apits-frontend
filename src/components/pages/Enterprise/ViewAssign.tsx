import { Box, Button, Modal, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { ConfirmedEntity } from "../../../entity";
import { rejectCandidate } from "../../../redux/apiRequest";
import CandidateDetail from "../../modules/pagecomponents/common/candidateDetail/CandidateDetail";
import "./ViewAssign.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import { openNewTab } from '../../../handle';

const AssignStatus = [
    "Confirmed",
    "Evaluating",
    "Approve",
    "Reject"
]

const ViewAssign = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState<string>(AssignStatus[0]);
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [candidates, setCandidates] = useState<ConfirmedEntity[]>([]);
    const [candidate, setCandidate] = useState<ConfirmedEntity>();

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [select])

    async function fetchData() {
        let url = ""
        switch (select) {
            case "Confirmed":
                url = "getListCandidateConfirmByRRId"
                break;
            case "Approve":
                url = "getListCandidateWINByRRId"
                break;
            default:
                url = "getListCandidateEVALUATINGByRRId"
                break;
        }
        const response = await axios.get(`/apply/${url}?recruitment_request_id=${id}`);
        setCandidates(response.data.data);
    }

    const handleLinkClick = (id: number) => {
        openNewTab(`/candidate-detail/${id}`);
    };


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleApprove = async (assignId: number) => {
        await axios.put(`/apply/approvedByEnterprise?id=${assignId}&enterpriseId=${user?.id}`).then((res) => {
            if (res.data.status === "SUCCESS") {
                setMessage("Approve candidate successfully!")
                setMessageStatus("green")
                fetchData();
            }
        })
    }

    const handleReject = async (assignId: number) => {
        await axios.put(`/apply/rejectedByEnterprise?id=${assignId}&enterpriseId=${user?.id}`).then((res) => {
            if (res.data.status === "SUCCESS") {
                setMessage("Reject candidate successfully!")
                setMessageStatus("green")
                fetchData();
            }
        })
    }

    const handleWinApply = async (assignId: number) => {
        await axios.put(`/apply/winApply?id=${assignId}`).then((res) => {
            if (res.data.status === "SUCCESS") {
                setMessage("Evaluate successfully!")
                setMessageStatus("green")
                fetchData();
            }
        })
    }

    const tableRender = () => {
        switch (select) {
            case "Evaluating":
                const columnsEvaluating: GridColDef[] = [
                    { field: "id", headerName: "ID", flex: 0.2 },
                    { field: "name", headerName: "Name", flex: 0.8 },
                    { field: "gender", headerName: "Gender", flex: 0.5 },
                    { field: "address", headerName: "Address", flex: 1.2 },
                    {
                        field: 'fail',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="error" onClick={() => { handleReject(params.row.assignId) }}>
                                Fail
                            </Button>
                        ),
                    },
                    {
                        field: 'pass',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="success" onClick={() => { handleWinApply(params.row.assignId) }}>
                                Pass
                            </Button>
                        ),
                    }
                    ,
                    {
                        field: 'detail',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="primary" onClick={() => {
                                setCandidate(params.row.candidate);
                                handleLinkClick(params.row.candidate.id)
                            }
                            }>
                                Detail
                            </Button>
                        ),
                    },
                ];

                const rowsEvaluating = candidates?.length > 0 ? candidates?.map((candidate) => ({
                    id: candidate.assignId,
                    name: candidate.candidateResponse.name,
                    gender: candidate.candidateResponse.gender,
                    address: candidate.candidateResponse.address,
                    assignId: candidate.assignId,
                    candidate: candidate.candidateResponse
                })) : [];

                return (
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid rows={rowsEvaluating}
                            columns={columnsEvaluating}
                            autoPageSize
                            pagination
                            checkboxSelection />
                    </div>
                )
            case "Approve":
                const columnsApprove: GridColDef[] = [
                    { field: "id", headerName: "ID", flex: 0.2 },
                    { field: "name", headerName: "Name", flex: 0.8 },
                    { field: "gender", headerName: "Gender", flex: 0.5 },
                    { field: "address", headerName: "Address", flex: 1.2 },
                    {
                        field: 'contract',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="info">
                                Contract
                            </Button>
                        ),
                    }
                    ,
                    {
                        field: 'detail',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="primary" onClick={() => {
                                setCandidate(params.row.candidate);
                                handleLinkClick(params.row.candidate.id)
                            }
                            }>
                                Detail
                            </Button>
                        ),
                    },
                ];

                const rowsApprove = candidates?.length > 0 ? candidates?.map((candidate) => ({
                    id: candidate.assignId,
                    name: candidate.candidateResponse.name,
                    gender: candidate.candidateResponse.gender,
                    address: candidate.candidateResponse.address,
                    assignId: candidate.assignId,
                    candidate: candidate.candidateResponse,
                })) : [];

                return (
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid rows={rowsApprove}
                            columns={columnsApprove}
                            autoPageSize
                            pagination
                            checkboxSelection />
                    </div>
                )

            default:
                const columns: GridColDef[] = [
                    { field: "id", headerName: "ID", flex: 0.2 },
                    { field: "name", headerName: "Name", flex: 0.8 },
                    { field: "gender", headerName: "Gender", flex: 0.5 },
                    { field: "address", headerName: "Address", flex: 1.2 },
                    {
                        field: 'reject',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="error" onClick={() => { handleReject(params.row.assignId) }}>
                                Reject
                            </Button>
                        ),
                    },
                    {
                        field: 'approve',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="success" onClick={() => { handleApprove(params.row.assignId) }}>
                                Approve
                            </Button>
                        ),
                    }
                    ,
                    {
                        field: 'detail',
                        headerName: '',
                        flex: 0.5,
                        width: 170,
                        renderCell: (params) => (
                            <Button variant="contained" color="primary" onClick={() => {
                                setCandidate(params.row.candidate);
                                handleLinkClick(params.row.candidate.id)
                            }
                            }>
                                Detail
                            </Button>
                        ),
                    },
                ];

                const rows = candidates?.length > 0 ? candidates?.map((candidate) => ({
                    id: candidate.assignId,
                    name: candidate.candidateResponse.name,
                    gender: candidate.candidateResponse.gender,
                    address: candidate.candidateResponse.address,
                    assignId: candidate.assignId,
                    candidate: candidate.candidateResponse
                })) : [];

                return (
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid rows={rows}
                            columns={columns}
                            autoPageSize
                            pagination
                            checkboxSelection />
                    </div>
                )
        }
    }

    return (
        <div>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
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
            {tableRender()}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='candidate-detail-modal'>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <CandidateDetail candidate={candidate?.candidateResponse} />
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ViewAssign;