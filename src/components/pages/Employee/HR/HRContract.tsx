import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import { ContractAgreementResponse, ContractLarborSupplyResponse, interviewDetailResponse } from "../../../../entity";
import ContractCreateForm from "./ContractCreateForm";
import "./HRContract.css";

const types = [
    "CREATE",
    "CANDIDATE",
    "ENTERPRISE"
]


const HRContract = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [interviewsDetail, setInterviewsDetail] = useState<interviewDetailResponse[]>([]);
    const [entepriseContracts, setEnterpriseContracts] = useState<ContractLarborSupplyResponse[]>([]);
    const [entepriseContract, setEnterpriseContract] = useState<ContractLarborSupplyResponse>();
    const [candidateContracts, setCandidateContracts] = useState<ContractAgreementResponse[]>([]);
    const [candidateContract, setCandidateContract] = useState<ContractAgreementResponse>();
    const [interviewDetail, setInterviewDetail] = useState<interviewDetailResponse>();
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [type, setType] = useState<string>(types[0]);


    useEffect(() => {
        fetchData();
        fetchDataEnterpriseContract();
        fetchDataCandidateContract();
    }, [type]);

    async function fetchData() {
        const res = await axios.get("/interview-detail/getAllInterviewDetail");
        const data = await res?.data.data;
        setInterviewsDetail(data.responseList.filter((e: interviewDetailResponse) => e.status !== "DONE"));
    }

    async function fetchDataEnterpriseContract() {
        const res = await axios.get(`/contract/getContractLaborSupplyByEmployee?id=${user?.id}`);
        const data = await res?.data.data;
        setEnterpriseContracts(data);
    }

    async function fetchDataCandidateContract() {
        const res = await axios.get(`/contract/getContractAgreementByEmployee?id=${user?.id}`);
        const data = await res?.data.data;
        setCandidateContracts(data);
    }

    const handleShowCreate = () => { setIsCreate(true) };


    const tableRenderCreate = () => {
        console.log(interviewsDetail);
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

    const tableRenderCandidate = () => {
        const rows = candidateContracts?.length > 0 ? candidateContracts?.map((item) => ({
            id: item.id,
            contract: item.id,
            name: item.signatureEmployee
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "name", headerName: "Name", flex: 1.2 },
            {
                field: 'interview',
                headerName: '',
                flex: 0.5,
                width: 170,
                renderCell: (params) => (
                    <Button variant="contained" color="warning" onClick={() => {
                        handleShowCreate();
                        setCandidateContract(params.row.interviewDetail)
                    }}>
                        Detail
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

    const tableRenderEnterprsie = () => {
        const rows = entepriseContracts?.length > 0 ? entepriseContracts?.map((item) => ({
            id: item.id,
            contract: item,
            name: item.name
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "name", headerName: "name", flex: 1.2 },
            {
                field: 'interview',
                headerName: '',
                flex: 0.5,
                width: 170,
                renderCell: (params) => (
                    <Button variant="contained" color="warning" onClick={() => {
                        handleShowCreate();
                        setEnterpriseContract(params.row.interviewDetail)
                    }}>
                        Detail
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
                <div className="filter">
                    <div className="filter-form-input">
                        <div className="filter-input-icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                        </div>
                        <input type="text" placeholder='Enter search keywords' />
                    </div>
                    <Dropdown className="filter-dropdown ml-8">
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                            <span>{type}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='filter-menu'>
                            {
                                types.map((type, index) => {
                                    return (
                                        <Dropdown.Item className='filter-item' onClick={() => { setType(type) }} key={index}>{type}</Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <button className='btn-search ml-8'>Search</button>
                </div>
                <div style={{ height: 400, width: "100%" }}>
                    {
                        type === types[0]
                            ? tableRenderCreate()
                            : type === types[1]
                                ? tableRenderCandidate()
                                : tableRenderEnterprsie()
                    }
                </div>
            </div>
        )
    }


    return (
        <div id='HRContract'>
            {
                isCreate ?
                    <ContractCreateForm interviewDetail={interviewDetail} contractAgreement={candidateContract} contractLaborSupply={entepriseContract} setIsCreate={setIsCreate} />
                    :
                    renderInterviewDetailList()
            }
        </div>
    )
}

export default HRContract