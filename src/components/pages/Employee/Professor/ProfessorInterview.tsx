import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import { InterviewResponse } from "../../../../entity";
import MessageBox from "../../../modules/pagecomponents/Popup/MessageBox/MessageBox";
import "./ProfessorInterview.css";
import { CandidateSpecialty, SpecialtyEntity } from "../../../../model";
import { updateInterviewCancel, updateInterviewDone } from "../../../../redux/apiRequest";


const interviewType = [
  "CHECK",
  "TEST",
  "CHECK DONE",
  "TEST DONE"
]

const ProfessorInterview = () => {
  const user = useSelector((state: any) => state.user.user.user);

  const [type, setType] = useState<string>(interviewType[0])
  const [interviewChecksPending, setInterviewChecksPending] = useState<InterviewResponse[]>([]);
  const [interviewChecksDone, setInterviewChecksDone] = useState<InterviewResponse[]>([]);
  const [interviewTestsPending, setInterviewTestsPending] = useState<InterviewResponse[]>([]);
  const [interviewTestsDone, setInterviewTestsDone] = useState<InterviewResponse[]>([]);
  const [showInterviewReport, setShowInterviewReport] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');
  const [candidate, setCandidate] = useState<CandidateSpecialty>();
  const [checkedCourses, setCheckedCourses] = useState<string[]>([]);
  const [reportStatus, setReportStatus] = useState<boolean>(true);
  const [interviewId, setInterviewId] = useState<number>();

  const handleCheckboxChange = (event: any) => {
    const courseId = event.target.id;
    if (event.target.checked) {
      setCheckedCourses([...checkedCourses, courseId]);
    } else {
      setCheckedCourses(checkedCourses.filter(id => id !== courseId));
    }
  }
  const handleCloseInterviewReport = () => setShowInterviewReport(false);
  const handleShowInterviewReport = () => { setShowInterviewReport(true) };



  useEffect(() => {
    fetchTestInterview();
    fetchCheckInterview();
  }, [candidate, type])

  async function fetchTestInterview() {
    const res = await axios.get(`/getInterviewOfProfessorTypeTest?professorId=${user?.id}`);
    const data = await res?.data.data;
    setInterviewTestsPending(data.filter((e: InterviewResponse) => e.status === "PENDING"));
    setInterviewTestsDone(data.filter((e: InterviewResponse) => e.status === "DONE"));
  }

  async function fetchCheckInterview() {
    const response = await axios.get(`/getInterviewOfProfessorTypeCheck?professorId=${user?.id}`);
    const dataRes = await response?.data.data;
    setInterviewChecksPending(dataRes.filter((e: InterviewResponse) => e.status === "PENDING"));
    setInterviewChecksDone(dataRes.filter((e: InterviewResponse) => e.status === "DONE"));
  }


  const handlePassCourse = async (candidateId: number, courseId: number) => {
    await axios.put(`/status-candidate-course/updateStatusDone?candidateId=${candidateId}&coursesId=${courseId}`).then(async function (res) {
      if (res.data.message == "SUCCESS") {
        setMessage("Evaluate successfuly!");
        setMessageStatus("green");
        updateInterviewDone(interviewId);
        fetchCheckInterview();
      }
    })
  }

  const handleFailCourse = async () => {
    updateInterviewCancel(interviewId)
    fetchCheckInterview();
  }

  async function getSpecialtyDetail(candidateId: number, specialtyId: number) {
    const res = await axios.get(`/canspec/getASpecDetailByCandidateId?candidateId=${candidateId}&specialId=${specialtyId}`);
    const data = await res.data.data;
    setCandidate(data);
  }

  const tableRenderCheck = () => {
    const rows = interviewChecksPending?.length > 0 ? interviewChecksPending?.map((item) => ({
      id: item.id,
      candidateId: item.candidateId,
      link: item.linkMeeting,
      title: item.purpose,
      date: item.date,
      slot: item.slot,
      courseId: item.tempId
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
        field: 'fail',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" style={{ backgroundColor: "red" }} onClick={() => {
            setInterviewId(params.row.id)
            handleFailCourse();
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
            setInterviewId(params.row.id)
            handlePassCourse(params.row.candidateId, params.row.courseId)
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
      candidateId: item.candidateId,
      link: item.linkMeeting,
      title: item.purpose,
      date: item.date,
      slot: item.slot,
      courseId: item.tempId,
      status: item.status
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
        field: 'result',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          (params.row.status == "DONE")
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
      {
        field: 'interview',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" color="warning" onClick={() => {
            getSpecialtyDetail(params.row.candidateId, params.row.specialtyId);
            setInterviewId(params.row.id)
            handleShowInterviewReport();
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
      {
        field: 'interview',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" color="warning" onClick={() => {
            console.log(params.row.specialtyId)
            getSpecialtyDetail(params.row.candidateId, params.row.specialtyId);
            handleShowInterviewReport();
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

  const handleReport = () => {
    setReportStatus(true);
    checkedCourses.map((courseId) => {
      axios.put(`/status-candidate-course/updateStatusDoneByProfessor?candidateId=${candidate?.id}&coursesId=${courseId}`).then(function (res) {
        if (res.data.message == "SUCCESS") {
          setReportStatus(true);
        } else {
          setReportStatus(false)
        }
      })
    })
    if (reportStatus) {
      setMessage("Report successfuly!");
      setMessageStatus("green");
      if (candidate !== undefined) {
        getSpecialtyDetail(candidate?.id, candidate?.specialty.id);
      }
      updateInterviewDone(interviewId);
      handleCloseInterviewReport();
    }
    fetchTestInterview();
  }

  return (
    <div id='ProfessorInterview'>
      {
        message != '' ?
          <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
          :
          null
      }
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
            : (type === interviewType[1])
              ? tableRenderTest()
              : (type === interviewType[2])
                ? tableRenderCheckDone()
                : tableRenderTestDone()
        }
      </div>
      <Modal id="InterviewCreateModal" show={showInterviewReport} onHide={handleCloseInterviewReport}>
        <Modal.Header closeButton>
          <Modal.Title>Interview Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="candidate-container">
            <strong>Candidate:</strong>
            <h3>{candidate?.name}</h3>
          </div>
          <h4>{candidate?.specialty.name}</h4>
          <div>
            {candidate?.specialty.skills.map((skill) => {
              return (
                <div>
                  <span>{skill.name}</span>
                  <Form>
                    <div key={`${skill.id}`} className="mb-3">
                      {
                        skill.levels.map((level) =>
                          level.courses.map((course) => {
                            return (
                              course.status !== "DONE"
                                ?
                                <Form.Check
                                  className="report-course"
                                  style={{ display: "flex", alignItems: "center" }}
                                  id={`${course.id}`}
                                  label={course.name}
                                  checked={checkedCourses.includes(`${course.id}`)}
                                  onChange={handleCheckboxChange}
                                />
                                :
                                <Form.Check
                                  className="report-course"
                                  style={{ display: "flex", alignItems: "center" }}
                                  disabled
                                  id={`${course.id}`}
                                  label={course.name}
                                  checked={checkedCourses.includes(`${course.id}`)}
                                  onChange={handleCheckboxChange}
                                />
                            )
                          }))
                      }
                    </div>

                  </Form>
                </div>
              )
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={() => { handleReport() }}>Report</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProfessorInterview