import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import { InterviewResponse } from "../../../entity";
import "./CandidateInterview.css";
import { useParams } from "react-router-dom";
import { EvaluationResponse } from "../../../Models";

const interviewType = [
    "CHECK",
    "TEST"
]

const CandidateInterview = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const { id } = useParams();


    const [type, setType] = useState<string>(interviewType[0])
    const [interviewChecks, setInterviewChecks] = useState<EvaluationResponse[]>([]);
    const [interviewTests, setInterviewTests] = useState<EvaluationResponse[]>([]);
    const [interviewHires, setInterviewHires] = useState<InterviewResponse[]>([]);


    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const response = await axios.get(`/getEvaluationSessionByCandidate?candidateId=${user?.id}`);
        const dataRes = await response?.data.data;
        console.log(dataRes.filter((e: EvaluationResponse) => e.type === "TEST"))
        setInterviewChecks(dataRes.filter((e: EvaluationResponse) => e.type === "CHECK_CANDIDATE_COURSE"));
        setInterviewTests(dataRes.filter((e: EvaluationResponse) => e.type === "TEST"));
    }

    const tableRenderCheck = () => {
        console.log(interviewChecks)
        const rows = interviewChecks?.length > 0 ? interviewChecks?.filter((e) => e.status === "PENDING").map((item) => ({
            id: item.id,
            candidate: item.candidateResponse,
            link: item.linkMeeting,
            title: item.title,
            date: item.date,
            slot: item.slot,
            courseId: item.candidateCourse.course.id
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 1.2 },
            {
                field: 'link',
                headerName: 'Link',
                flex: 1.2,
                renderCell: (params) => (
                    <a href={params.row.link}>{params.row.link}</a>
                )
            },
            { field: "date", headerName: "Date", flex: 0.8 },
            { field: "slot", headerName: "Slot", flex: 0.8 },
        ];
        return (
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination />
        )
    }

    const tableRenderTest = () => {
        const rows = interviewTests?.length > 0 ? interviewTests?.filter((e) => e.status === "PENDING").map((item) => ({
            id: item.id,
            candidateId: item.candidateResponse.id,
            link: item.linkMeeting,
            title: item.title,
            date: item.date,
            slot: item.slot,
            specialtyId: item.specialty.id,
            specialty: item.specialty.name
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 1.2 },
            { field: "specialty", headerName: "Specialty", flex: 1 },
            {
                field: 'link',
                headerName: 'Link',
                flex: 1.2,
                renderCell: (params) => (
                    <a href={params.row.link}>{params.row.link}</a>
                )
            },
            { field: "date", headerName: "Date", flex: 0.8 },
            { field: "slot", headerName: "Slot", flex: 0.8 },
        ];
        return (
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination />
        )
    }

    const tableRenderHire = () => {
        const rows = interviewHires?.length > 0 ? interviewHires?.filter((e) => e.status === "PENDING").map((item) => ({
            id: item.id,
            candidateId: item.candidateId,
            link: item.linkMeeting,
            title: item.purpose,
            date: item.date,
            slot: item.slot,
            specialtyId: item.tempId
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 1.2 },
            {
                field: 'link',
                headerName: 'Link',
                flex: 1.2,
                renderCell: (params) => (
                    <a href={params.row.link}>{params.row.link}</a>
                )
            },
            { field: "date", headerName: "Date", flex: 0.8 },
            { field: "slot", headerName: "Slot", flex: 0.8 },
        ];
        return (
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination />
        )
    }

    return (
        <div id='CandidateInterview'>
            <h2>Evaluation</h2>
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
                            interviewType.map((type, index) => {
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
                    (type === interviewType[0])
                        ? tableRenderCheck()
                        :
                        (type === interviewType[1])
                            ? tableRenderTest()
                            : tableRenderHire()
                }
            </div>
        </div>
    )
}

export default CandidateInterview