import { Box, Button, Modal, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { ConfirmedEntity } from "../../../entity";
import { rejectCandidate } from "../../../redux/apiRequest";
import CandidateDetail from "../../modules/pagecomponents/common/candidateDetail/CandidateDetail";
import "./ViewAssign.css";

interface Props {
    specialtyId: number | undefined;
}

const ViewAssign:FC<Props> = ({specialtyId}) => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [candidates, setCandidates] = useState<ConfirmedEntity[]>([]);
    const [candidate, setCandidate] = useState<ConfirmedEntity>();

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const response = await axios.get(`/assign/getListCandidateConfirmByRRId?recruitment_request_id=${id}`);
        setCandidates(response.data.data);
    }


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
        await axios.get(`/assign/approvedAssignEnterprise?id=${assignId}`).then((res) => {
            if (res.data.status === "SUCCESS") {
                fetchData();
            }
        })
    }

    const handleReject = (assignId: number, candidateId: number) => {
        rejectCandidate(assignId, candidateId)
        fetchData();
    }

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
                <Button variant="contained" color="error" onClick={() => { handleReject(params.row.assignId, params.row.id) }}>
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
                <Button variant="contained" color="primary" onClick={()=>{
                    setCandidate(params.row.candidate);
                    handleOpen();
                }
                }>
                    Detail
                </Button>
            ),
        },
    ];

    const rows = candidates?.length > 0 ? candidates?.map((candidate) => ({
        id: candidate.candidateResponse.id,
        name: candidate.candidateResponse.name,
        gender: candidate.candidateResponse.gender,
        address: candidate.candidateResponse.address,
        assignId: candidate.assignId,
        candidate: candidate
    })) : [];

    return (
        <div>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={rows}
                    columns={columns}
                    autoPageSize
                    pagination
                    checkboxSelection />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='candidate-detail-modal'>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <CandidateDetail candidate={candidate?.candidateResponse} specialtyId={specialtyId}/>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ViewAssign;