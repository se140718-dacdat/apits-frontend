import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import { Contract, interviewDetailResponse } from "../../../../entity";
import ContractView from "../../../modules/pagecomponents/common/ContractView";
import ContractCreatePage from "./ContractCreate";
import "./HRContract.css";

const types = [
    "CREATE",
    "PROCESSING",
    "DONE"
]


const HRContract = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [contract, setContract] = useState<Contract>();
    const [interviewsDetail, setInterviewsDetail] = useState<interviewDetailResponse[]>([]);
    const [interviewDetail, setInterviewDetail] = useState<interviewDetailResponse>();
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isView, setIsView] = useState<boolean>(false);
    const [type, setType] = useState<string>(types[0]);


    useEffect(() => {
        fetchData();
        console.log(contracts.filter((e) => e.status === "PROCESSING"))
    }, [type, isCreate, isLoading]);

    async function fetchData() {
        await axios.get("/contract/getAllContract").then((res) => {
            const data = res.data;
            if (data.status == "SUCCESS") {
                setContracts(data.data.responseList);
            }
        })
        const res = await axios.get("/interview-detail/getAllInterviewDetail");
        const data = await res?.data.data;
        setInterviewsDetail(data.responseList.filter((e: interviewDetailResponse) => e.status !== "DONE"));
        setIsLoading(false)
    }

    const handleShowCreate = () => { setIsCreate(true) };
    const handleShowView = () => { setIsView(true) };

    const handlePaid = async (id: number) => {
        await axios.put(`/contract/updateStatusDone?id=${id}`).then((res) => {
            if(res.data.status === "SUCCESS") {
                setIsLoading(true);
            }
        })
    }

    const tableRenderCreate = () => {
        const rows = interviewsDetail?.length > 0 ? interviewsDetail?.map((item) => ({
            id: item.id,
            interviewDetail: item,
            candidate: item.interview.assign.candidate.name,
            enterprise: item.interview.assign.recruitmentRequest.creator.name,
            position: `${item.interview.assign.recruitmentRequest.specialty.name} ${item.interview.assign.recruitmentRequest.experienceSpecialty.name}`,
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

    const tableRenderProcessing = () => {
        const rows = contracts?.length > 0 ? contracts?.filter((e) => e.status === "PROCESSING").map((item) => ({
            contract: item,
            id: item.id,
            position: `${item.interviewDetail.interview.assign.recruitmentRequest.specialty.name} ${item.interviewDetail.interview.assign.recruitmentRequest.experienceSpecialty.name}`,
            candidate: item.interviewDetail.interview.assign.candidate.name,
            candidatePhone: item.interviewDetail.interview.assign.candidate.phone,
            enterprise: item.interviewDetail.interview.assign.recruitmentRequest.creator.name,
            enterprisePhone: item.interviewDetail.interview.assign.recruitmentRequest.hrPhone
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "position", headerName: "Position", flex: 1.2 },
            { field: "candidate", headerName: "Candidate", flex: 0.8 },
            { field: "candidatePhone", headerName: "Candidate Phone", flex: 0.5 },
            { field: "enterprise", headerName: "Enterprise", flex: 0.8 },
            { field: "enterprisePhone", headerName: "Enterprise Phone", flex: 0.5 },
            {
                field: 'detail',
                headerName: '',
                flex: 0.5,
                width: 170,
                renderCell: (params) => (
                    <Button variant="contained" color="warning" onClick={() => {
                        handleShowView();
                        setContract(params.row.contract)
                    }}>
                        Detail
                    </Button>
                ),
            },
            {
                field: 'paid',
                headerName: '',
                flex: 0.5,
                width: 170,
                renderCell: (params) => (
                    <Button variant="contained" color="success" onClick={() => {
                        handlePaid(params.row.id);
                    }}>
                        Paid
                    </Button>
                ),
            }
        ];
        return (
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination />
        )
    }

    const tableRenderDone = () => {
        const rows = contracts?.length > 0 ? contracts.filter((e) => e.status === "DONE")?.map((item) => ({
            contract: item,
            id: item.id,
            position: `${item.interviewDetail.interview.assign.recruitmentRequest.specialty.name} ${item.interviewDetail.interview.assign.recruitmentRequest.experienceSpecialty.name}`,
            candidate: item.interviewDetail.interview.assign.candidate.name,
            candidatePhone: item.interviewDetail.interview.assign.candidate.phone,
            enterprise: item.interviewDetail.interview.assign.recruitmentRequest.creator.name,
            enterprisePhone: item.interviewDetail.interview.assign.recruitmentRequest.hrPhone
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "position", headerName: "Position", flex: 1.2 },
            { field: "candidate", headerName: "Candidate", flex: 0.8 },
            { field: "candidatePhone", headerName: "Candidate Phone", flex: 0.5 },
            { field: "enterprise", headerName: "Enterprise", flex: 0.8 },
            { field: "enterprisePhone", headerName: "Enterprise Phone", flex: 0.5 },
            {
                field: 'Detail',
                headerName: '',
                flex: 0.5,
                width: 170,
                renderCell: (params) => (
                    <Button variant="contained" color="warning" onClick={() => {
                        handleShowView();
                        setContract(params.row.contract)
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
                                ? tableRenderProcessing()
                                : tableRenderDone()
                    }
                </div>
            </div>
        )
    }


    return (
        <div id='HRContract'>
            {
                isCreate ?
                    <ContractCreatePage interviewDetail={interviewDetail} setIsCreate={setIsCreate} />
                    : isView && contract ?
                        <ContractView contractId={contract?.id} setIsView={setIsView} />
                        :
                        renderInterviewDetailList()
            }
        </div>
    )
}

export default HRContract