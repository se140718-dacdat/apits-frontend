import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import MessageBox from "../../../modules/pagecomponents/Popup/MessageBox/MessageBox";
import "./ProfessorInterview.css";
import { CandidateSpecialty } from "../../../../model";
import { updateInterviewCancel, updateInterviewDone } from "../../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { EvaluatingResult, EvaluationResponse } from "../../../../Models";


const interviewType = [
  "CHECK",
  "TEST",
  "CHECK DONE",
  "TEST DONE"
]

const ProfessorInterview = () => {
  const user = useSelector((state: any) => state.user.user.user);
  const navigate = useNavigate();

  const [type, setType] = useState<string>(interviewType[0])
  const [interviewChecksPending, setInterviewChecksPending] = useState<EvaluationResponse[]>([]);
  const [interviewChecksDone, setInterviewChecksDone] = useState<EvaluationResponse[]>([]);
  const [interviewTestsPending, setInterviewTestsPending] = useState<EvaluationResponse[]>([]);
  const [interviewTestsDone, setInterviewTestsDone] = useState<EvaluationResponse[]>([]);
  const [showInterviewReport, setShowInterviewReport] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');
  const [candidate, setCandidate] = useState<CandidateSpecialty>();
  const [checkedCourses, setCheckedCourses] = useState<string[]>([]);
  const [reportStatus, setReportStatus] = useState<boolean>(true);
  const [interviewId, setInterviewId] = useState<number>();
  const [evaluationTest, setEvaluationTest] = useState<EvaluationResponse>();
  const [report, setReport] = useState<EvaluatingResult>();


  const handleCheckboxChange = (event: any) => {
    const courseId = event.target.id;
    if (event.target.checked) {
      setCheckedCourses([...checkedCourses, courseId]);
    } else {
      setCheckedCourses(checkedCourses.filter(id => id !== courseId));
    }
  }
  const handleCloseInterviewReport = () => setShowInterviewReport(false);
  const handleShowInterviewReport = () => setShowInterviewReport(true);

  const handleReportTest = (interviewTest: EvaluationResponse) => {
    navigate("/evaluation", { state: { interviewTest: interviewTest } })
  };



  useEffect(() => {
    fetchData();
  }, [candidate, type])

  async function fetchData() {
    const response = await axios.get(`/getEvaluationSessionByProfessor?professorId=${user?.id}`);
    const dataRes = await response?.data.data;
    setInterviewChecksPending(dataRes.filter((e: EvaluationResponse) => e.status === "PENDING" && e.type === "CHECK_CANDIDATE_COURSE"));
    setInterviewChecksDone(dataRes.filter((e: EvaluationResponse) => e.status === "DONE" && e.type === "CHECK_CANDIDATE_COURSE"));
    setInterviewTestsPending(dataRes.filter((e: EvaluationResponse) => e.status === "PENDING" && e.type === "TEST"));
    setInterviewTestsDone(dataRes.filter((e: EvaluationResponse) => e.status === "DONE" && e.type === "TEST"));
  }

  async function getReport(id: number) {
    await axios.get(`/candidate-skillLevel/getListCandidateSkillLevelByEvaluation?evaluationSessionId=${id}`).then(async (res) => {
      if (res.data.status === "SUCCESS") {
        setReport(await res.data.data);
        handleShowInterviewReport();
        console.log(report )
      }
    })
  }


  const handlePassCourse = async (evaluationSessionId: number) => {
    await axios.put(`/updatePassEvaluationSession?evaluationSessionId=${evaluationSessionId}`).then(async function (res) {
      if (res.data.status == "SUCCESS") {
        fetchData();
        setMessage("Evaluate successfuly!");
        setMessageStatus("green");
      }
    })
  }

  const handleFailCourse = async (evaluationSessionId: number) => {
    await axios.put(`/updateNotPassEvaluationSession?evaluationSessionId=${evaluationSessionId}`).then(async function (res) {
      if (res.data.status == "SUCCESS") {
        fetchData();
        setMessage("Evaluate successfuly!");
        setMessageStatus("green");
      }
    })
  }


  async function getSpecialtyDetail(candidateId: number, specialtyId: number) {
    const res = await axios.get(`/canspec/getASpecDetailByCandidateId?candidateId=${candidateId}&specialId=${specialtyId}`);
    const data = await res.data.data;
    setCandidate(data);
  }

  const tableRenderCheck = () => {
    const rows = interviewChecksPending?.length > 0 ? interviewChecksPending?.map((item) => ({
      id: item.id,
      candidate: item.candidateResponse,
      candidateName: item.candidateResponse.name,
      link: item.linkMeeting,
      title: item.title,
      date: item.date,
      slot: item.slot,
      course: item.candidateCourse.course,
      candidateCourse: item.candidateCourse.course.name
    })) : [];

    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "candidateName", headerName: "ID", flex: 1.2 },
      { field: "title", headerName: "Title", flex: 1.2 },
      { field: "candidateCourse", headerName: "Course", flex: 0.8 },
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
      {
        field: 'fail',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" style={{ backgroundColor: "red" }} onClick={() => {
            setInterviewId(params.row.id)
            handleFailCourse(params.row.id);
          }}>
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
          <Button variant="contained" style={{ backgroundColor: "green" }} onClick={() => {
            handlePassCourse(params.row.id)
          }}>
            Pass
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

  const tableRenderCheckDone = () => {
    const rows = interviewChecksDone?.length > 0 ? interviewChecksDone?.map((item) => ({
      id: item.id,
      candidate: item.candidateResponse.name,
      course: item.candidateCourse.course.name,
      title: item.title,
      date: item.date,
      slot: item.slot,
      status: item.status,
      result: item.result
    })) : [];

    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "title", headerName: "Title", flex: 1.2 },
      { field: "candidate", headerName: "Candidate", flex: 0.8 },
      { field: "course", headerName: "Course", flex: 0.8 },
      { field: "date", headerName: "Date", flex: 0.8 },
      { field: "slot", headerName: "Slot", flex: 0.8 },
      {
        field: 'result',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          (params.row.result == "PASSED")
            ? <strong style={{ color: "green" }}>PASS</strong>
            : <strong style={{ color: "red" }}>FAIL</strong>
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

  const tableRenderTest = () => {
    const rows = interviewTestsPending?.length > 0 ? interviewTestsPending?.map((item) => ({
      item: item,
      id: item.id,
      title: item.title,
      candidateName: item.candidateResponse.name,
      specialtyName: item.specialty.name,
      link: item.linkMeeting,
      date: item.date,
      slot: item.slot
    })) : [];

    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "title", headerName: "Title", flex: 1.2 },
      { field: "candidateName", headerName: "Candidate", flex: 1.2 },
      { field: "specialtyName", headerName: "Specialty", flex: 1.2 },
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
      {
        field: 'interview',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" color="warning" onClick={() => {
            getSpecialtyDetail(params.row.candidateId, params.row.specialtyId);
            setInterviewId(params.row.id)
            handleReportTest(params.row.item);
          }}>
            Report
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

  const tableRenderTestDone = () => {
    const rows = interviewTestsDone?.length > 0 ? interviewTestsDone?.map((item) => ({
      item: item,
      id: item.id,
      title: item.title,
      candidateName: item.candidateResponse.name,
      specialtyName: item.specialty.name,
      link: item.linkMeeting,
      date: item.date,
      slot: item.slot
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
      {
        field: 'interview',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" color="warning" onClick={() => {
            getReport(params.row.id)
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

  return (
    <div id='ProfessorInterview'>
      {
        message != '' ?
          <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
          :
          null
      }
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
            : (type === interviewType[1])
              ? tableRenderTest()
              : (type === interviewType[2])
                ? tableRenderCheckDone()
                : tableRenderTestDone()
        }
      </div>
      <Modal id="InterviewCreateModal" show={showInterviewReport} onHide={handleCloseInterviewReport}>
        <Modal.Header closeButton>
          <Modal.Title>Evaluation Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="candidate-container">
            <strong>Candidate:</strong>
            <h3>{report?.candidate.name}</h3>
          </div>
          {
            report?.listSkillLevels.map((skill) => {
              return (
                <div className="item" key={skill.skillId}>
                  <img className="item-icon" src={skill.image} alt="" />
                  <strong className="item-name">{skill.skillName}</strong>
                  <span className="item-level">Level {skill.levelName}</span>
                </div>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={() => { handleCloseInterviewReport() }}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProfessorInterview