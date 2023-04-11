import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dropdown, Modal } from "react-bootstrap"
import { useState, useEffect } from "react"
import "./CandidateInterview.css";
import { useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { InterviewResponse } from "../../../entity";
import axios from "../../../api/axios";

const interviewType = [
    "CHECK",
    "TEST",
    "HIRE"
]

const CandidateInterview = () => {
    const user = useSelector((state: any) => state.user.user.user);

    const [type, setType] = useState<string>(interviewType[0])
    const [interviewChecks, setInterviewChecks] = useState<InterviewResponse[]>([]);
    const [interviewTests, setInterviewTests] = useState<InterviewResponse[]>([]);
    const [interviewHires, setInterviewHires] = useState<InterviewResponse[]>([]);
    const [showInterviewReport, setShowInterviewReport] = useState(false);


    const handleCloseInterviewReport = () => setShowInterviewReport(false);
    const handleShowInterviewReport = () => { setShowInterviewReport(true) };


    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const res = await axios.get(`/getInterviewOfCandidateTypeTest?candidateId=${user?.id}`);
        const data = await res?.data.data;
        setInterviewTests(data);
        const response = await axios.get(`/getInterviewOfCandidateTypeCheck?candidateId=${user?.id}`);
        const dataRes = await response?.data.data;
        setInterviewChecks(dataRes);
        const response1 = await axios.get(`/getInterviewOfCandidateTypeHire?candidateId=${user?.id}`);
        const dataRes1 = await response1?.data.data;
        setInterviewHires(dataRes1);
    }

    const tableRenderCheck = () => {

        const rows = interviewChecks?.length > 0 ? interviewChecks?.map((item) => ({
            id: item.id,
            candidateId: item.candidateId,
            link: item.linkMeeting,
            title: item.purpose,
            date: item.date,
            time: item.time,
            duration: `${item.duration}p`,
            courseId: item.tmpId
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 1.2 },
            { field: "link", headerName: "Link", flex: 1.2 },
            { field: "date", headerName: "Date", flex: 0.8 },
            { field: "time", headerName: "Time", flex: 0.5 },
            { field: "duration", headerName: "Duration", flex: 0.5 },
        ];
        return (
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination />
        )
    }

    const tableRenderTest = () => {
        const rows = interviewTests?.length > 0 ? interviewTests?.map((item) => ({
            id: item.id,
            candidateId: item.candidateId,
            link: item.linkMeeting,
            title: item.purpose,
            date: item.date,
            time: item.time,
            duration: `${item.duration}p`,
            specialtyId: item.tmpId
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 1.2 },
            { field: "link", headerName: "Link", flex: 1.2 },
            { field: "date", headerName: "Date", flex: 0.8 },
            { field: "time", headerName: "Time", flex: 0.5 },
            { field: "duration", headerName: "Duration", flex: 0.5 },
        ];
        return (
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination />
        )
    }

    const tableRenderHire = () => {
        const rows = interviewHires?.length > 0 ? interviewHires?.map((item) => ({
            id: item.id,
            candidateId: item.candidateId,
            link: item.linkMeeting,
            title: item.purpose,
            date: item.date,
            time: item.time,
            duration: `${item.duration}p`,
            specialtyId: item.tmpId
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 1.2 },
            { field: "link", headerName: "Link", flex: 1.2 },
            { field: "date", headerName: "Date", flex: 0.8 },
            { field: "time", headerName: "Time", flex: 0.5 },
            { field: "duration", headerName: "Duration", flex: 0.5 },
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
            <h2>Interviews</h2>
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
            <Modal id="InterviewCreateModal" show={showInterviewReport} onHide={handleCloseInterviewReport}>
                <Modal.Header closeButton>
                    <Modal.Title>Interview Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CandidateInterview