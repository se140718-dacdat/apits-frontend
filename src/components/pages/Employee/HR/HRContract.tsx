import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonGroup, Dropdown, Modal, ToggleButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./HRContract.css";
import axios from "../../../../api/axios";
import { interviewDetailResponse } from "../../../../entity";
import ContractCreateForm from "./ContractCreateForm";


const HRContract = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [interviewsDetail, setInterviewsDetail] = useState<interviewDetailResponse[]>([]);
    const [interviewDetail, setInterviewDetail] = useState<interviewDetailResponse>();
    const [isCreate, setIsCreate] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const res = await axios.get("/interview-detail/getAllInterviewDetail");
        const data = await res?.data.data;
        setInterviewsDetail(data.responseList);
    }

    const handleShowCreate = () => { setIsCreate(true) };


    const tableRenderHire = () => {
        const rows = interviewsDetail?.length > 0 ? interviewsDetail?.map((item) => ({
            id: item.id,
            interviewDetail: item,
            candidate: item.interview.assign.candidate.name,
            enterprise: item.interview.assign.recruitmentRequest.creator.name,
            position: item.interview.assign.recruitmentRequest.specialty,
            candidatePhone: item.interview.assign.candidate.phone,
            enterprisePhone: item.interview.assign.recruitmentRequest.creator.phone,
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "position", headerName: "Position", flex: 0.5 },
            { field: "candidate", headerName: "Candidate", flex: 0.8 },
            { field: "candidatePhone", headerName: "Candidate Phone", flex: 0.5 },
            { field: "enterprise", headerName: "Enterprise", flex: 0.8 },
            { field: "enterprisePhone", headerName: "Enterprise Phone", flex: 0.5 },
            {
                field: 'interview',
                headerName: '',
                flex: 0.5,
                width: 170,
                renderCell: (params) => (
                    <Button variant="contained" color="warning" onClick={() => {
                        handleShowCreate();
                        setInterviewDetail(params.row.interviewDetail)
                    }}>
                        Create
                    </Button>
                ),
            },
        ];
        return (
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination />
        )
    }

    const renderInterviewDetailList = () => {
        return (
            <div>
                <h2>Contract</h2>
                <div style={{ height: 400, width: "100%" }}>
                    {tableRenderHire()}
                </div>
            </div>
        )
    }


    return (
        <div id='HRContract'>
            {
                isCreate ? 
                <ContractCreateForm interviewDetail={interviewDetail} contractAgreement={undefined} contractLaborSupply={undefined} setIsCreate={setIsCreate} />
                : 
                renderInterviewDetailList()
            }
        </div>
    )
}

export default HRContract