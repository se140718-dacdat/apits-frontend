import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Interview } from "../../../../model";
import { Button, TextField } from '@mui/material';
import { useSelector } from "react-redux";
import { ApprovedEntity, AssignResponse, CandidateCourseProcessing, Duration, InterviewCreate, NewUserInterview, Professor } from "../../../../entity";
import { getAllAssignApproved, getAllEmployees, getAllNewCandidate, getCandidateCourseProcessing } from "../../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./Interview.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose, faMagnifyingGlass, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button as ButtonBootsrap } from 'react-bootstrap';


interface Props {
  type: string;
  id: number;
}

const durations: Duration[] = [
  {
    name: "1h",
    value: 60
  },
  {
    name: "1h30",
    value: 90
  },
  {
    name: "2h",
    value: 120
  },
  {
    name: "2h30",
    value: 150
  },
  {
    name: "3h",
    value: 180
  }
]

const InterviewTable: React.FC<Props> = ({ type, id }) => {
  const now = new Date();
  const account = useSelector((state: any) => state.auth.login.currentUser);
  const user = useSelector((state: any) => state.user.user.user);
  const navigate = useNavigate();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [assigns, setAssigns] = useState<ApprovedEntity[]>([]);
  const [newUsers, setNewUsers] = useState<NewUserInterview[]>([]);
  const [candidates, setCandidates] = useState<CandidateCourseProcessing[]>([]);
  const [showInterviewCreate, setShowInterviewCreate] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
  const [time, setTime] = useState('');
  const [link, setLink] = useState<string>('');
  const [duration, setDuration] = useState(durations[0].name);
  const [participantA, setParticipantA] = useState<string>('');
  const [participantB, setParticipantB] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [participantAId, setParticipantAId] = useState<number>();
  const [participantBId, setParticipantBId] = useState<number>();
  const [courseId, setCourseId] = useState<number>();
  const [specialtyId, setSpecialtyId] = useState<number>();
  const [specialty, setSpecialty] = useState<string>();
  const [assignId, setAssignId] = useState<number>();
  const [isPopupInterviewer, setIsPopupInterviewer] = useState(false);
  const [employees, setEmployees] = useState<Professor[]>([]);
  const [professor, setProfessor] = useState<Professor>();
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');



  const handleCloseInterviewCreate = () => setShowInterviewCreate(false);
  const handleShowInterviewCreate = () => { setShowInterviewCreate(true) };



  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setAssigns(await getAllAssignApproved());
    setNewUsers(await getAllNewCandidate());
    setCandidates(await getCandidateCourseProcessing());
    setEmployees(await getAllEmployees());
  }

  const tableRender = () => {
    switch (type) {
      case "ENTERPRISE":
        const rowsCandidate = assigns?.length > 0 ? assigns.map((item) => ({
          id: item.assignId,
          title: item.recruitmentRequest.title,
          candidateName: item.candidateResponse.name,
          candidateId: item.candidateResponse.id,
          enterpriseName: item.recruitmentRequest.creator.name,
          enterpriseId: item.recruitmentRequest.creator.id,
        })) : [];

        const columnsCandidate: GridColDef[] = [
          { field: "id", headerName: "ID", flex: 0.2 },
          { field: "title", headerName: "Title", flex: 0.8 },
          { field: "candidateName", headerName: "Candidate", flex: 0.5 },
          { field: "enterpriseName", headerName: "Enterprise", flex: 1.2 },
          {
            field: 'interview',
            headerName: '',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
              <Button variant="contained" color="primary" onClick={() => {
                setParticipantA(params.row.candidateName);
                setParticipantAId(params.row.candidateId);
                setParticipantB(params.row.enterpriseName);
                setParticipantBId(params.row.enterpriseId);
                setAssignId(params.row.id);
                handleShowInterviewCreate()
              }}>
                Create
              </Button>
            ),
          },
        ];
        return (<DataGrid rows={rowsCandidate}
          columns={columnsCandidate}
          autoPageSize
          pagination />)
      case "CHECK":
        const rowsTest = candidates?.length > 0 ? candidates?.map((item) => ({
          id: item.id,
          candidateName: item.candidate.name,
          phone: item.candidate.phone,
          courseName: item.course.name,
          courseId: item.course.id
        })) : [];

        const columnsTest: GridColDef[] = [
          { field: "id", headerName: "ID", flex: 0.2 },
          { field: "candidateName", headerName: "Name", flex: 0.8 },
          { field: "phone", headerName: "Phone", flex: 0.5 },
          { field: "courseName", headerName: "Course", flex: 1.2 },
          {
            field: 'interview',
            headerName: '',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
              <Button variant="contained" color="primary" onClick={() => {
                setParticipantA(params.row.candidateName);
                setParticipantAId(params.row.id);
                setCourse(params.row.courseName);
                setCourseId(params.row.courseId)
                handleShowInterviewCreate()
              }}>
                Create
              </Button>
            ),
          },
        ];
        return (
          <DataGrid rows={rowsTest}
            columns={columnsTest}
            autoPageSize
            pagination />
        )
      default:
        const rows = candidates?.length > 0 ? newUsers?.map((item) => ({
          id: item.id,
          candidateName: item.candidate.name,
          phone: item.candidate.phone,
          specialtyName: item.specialty.name,
          specialtyId: item.specialty.id
        })) : [];

        const columns: GridColDef[] = [
          { field: "id", headerName: "ID", flex: 0.2 },
          { field: "candidateName", headerName: "Name", flex: 0.8 },
          { field: "phone", headerName: "Phone", flex: 0.5 },
          { field: "specialtyName", headerName: "Specialty", flex: 1.2 },
          {
            field: 'interview',
            headerName: 'Interview',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
              <Button variant="contained" color="primary" onClick={() => {
                setSpecialtyId(params.row.specialtyId);
                setParticipantA(params.row.candidateName);
                setParticipantAId(params.row.id);
                setSpecialty(params.row.specialtyName);
                handleShowInterviewCreate()
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
  }

  const handleCreateInterview = () => {
    switch (type) {
      case "CHECK":
        if (courseId !== undefined && participantAId !== undefined && professor !== undefined) {
          const request: InterviewCreate = {
            title: title,
            date: `${date}`,
            time: time,
            linkMeeting: link,
            duration: duration,
            type: type,
            managerId: user?.id,
            tmpId: courseId,
            candidateId: participantAId,
            hostId: professor?.id
          }
          console.log(request);
        } else {
          console.log("ERROR")
        }
        break;

      case "ENTERPRISE":
        if (assignId !== undefined && participantAId !== undefined && participantBId !== undefined) {
          const request: InterviewCreate = {
            title: title,
            date: `${date}`,
            time: time,
            linkMeeting: link,
            duration: duration,
            type: type,
            managerId: user?.id,
            tmpId: assignId,
            candidateId: participantAId,
            hostId: participantBId
          }
          console.log(request);
        } else {
          console.log("ERROR")
        }
        break;

      default:
        if (specialtyId !== undefined && participantAId !== undefined && professor !== undefined) {
          const request: InterviewCreate = {
            title: title,
            date: `${date}`,
            time: time,
            linkMeeting: link,
            duration: duration,
            type: type,
            managerId: user?.id,
            tmpId: specialtyId,
            candidateId: participantAId,
            hostId: professor?.id
          }
          console.log(request);
        } else {
          console.log("ERROR")
        }
        break;
    }
  }

  const handleCheckType = () => {
    if (type === "ENTERPRISE") {
      return (
        <div className="participant-container">
          <span className="participant-title">Professor:</span>
          <div className="participant__name btn-item hover">
            <span>{participantB}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="participant-container">
          <span className="participant-title">Professor:</span>
          {
            professor !== undefined
              ? (
                <div className="participant__name btn-item hover" onClick={() => setProfessor(undefined)}>
                  <span>{professor.name}</span>
                  <FontAwesomeIcon className="icon" icon={faClose} />
                </div>
              )
              : (
                <FontAwesomeIcon
                  className="participant__icon--plus hover"
                  icon={faPlusCircle}
                  onClick={() => setIsPopupInterviewer(true)}
                />
              )
          }
        </div>
      )
    }
  }

  return (
    <div id="Interview">
      <div style={{ height: 400, width: "100%" }}>
        {tableRender()}
      </div>

      <Modal id="InterviewCreateModal" show={showInterviewCreate} onHide={handleCloseInterviewCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Meeting form section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="detail-container">
            <h3>Detailed information</h3>
            <div className="input-container">
              <span className="input-title">Title:</span>
              <input type="text" placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className="input-container">
              <span className="input-title">Interview Type:</span>
              <span className="interview-type">
                {
                  type == "ENTERPRISE"
                    ? "Interview with Enterprise"
                    : type == "TEST"
                      ? "Test specialty with Professor"
                      : "Check course with Professor"
                }
              </span>
            </div>
            {
              type == "CHECK"
                ? (
                  <div className="input-container">
                    <span className="input-title">Course:</span>
                    <span className="interview-type">
                      {course}
                    </span>
                  </div>
                )
                : type == "TEST"
                  ? (
                    <div className="input-container">
                      <span className="input-title">Specialty:</span>
                      <span className="interview-type">
                        {specialty}
                      </span>
                    </div>
                  )
                  : null
            }
            <div className="input-container">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Expected start time"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="input-container">
              <input type="time" onChange={(e) => { setTime(e.target.value) }} />
            </div>
            <div className="input-container">
              <span className="input-title">Expected duration:</span>
              <div className="gr-right form-input-select">
                <select className="form-select select-duration" onChange={e => setDuration(e.target.value)}>
                  {
                    durations?.map((duration) => {
                      return (
                        <option value={duration.value}>{duration.name}</option>
                      )
                    })
                  }

                </select>
              </div>
            </div>
            <div className="input-container">
              <span className="input-title">Link interview:</span>
              <input type="text" placeholder="Link meeting" onChange={(e) => { setLink(e.target.value) }} />
            </div>
          </div>
          <div className="participants">
            <h3>Participants</h3>
            {handleCheckType()}
            <div className="participant-container">
              <span className="participant-title">Candidate:</span>
              <div className="participant__name btn-item" onClick={() => setProfessor(undefined)}>
                <span>{participantA}</span>
              </div>
            </div>
          </div>
          {
            isPopupInterviewer
              ? (
                <div id="PopupInterviewer">
                  <div className="layer" onClick={() => setIsPopupInterviewer(false)}></div>
                  <div className="interviewer-container">
                    <div className="header">
                      <label className="filter-interview-title">Search Professor</label>
                      <FontAwesomeIcon className="filter-interview-close" onClick={() => setIsPopupInterviewer(false)} icon={faXmark}></FontAwesomeIcon>
                    </div>
                    <div className="interviewer-search input-pos">
                      <input type="text" className="input-search input input-border" placeholder="Enter professor name" />
                      <div className="search-name">
                        {
                          employees?.map((employee, key) =>
                            <div className="search-name-interviewer" key={key}
                              onClick={() => {
                                setProfessor(employee);
                                setIsPopupInterviewer(false);
                              }}>
                              <span>{employee.name}</span>
                              <FontAwesomeIcon icon={faArrowRight} className="search-icon" />
                            </div>
                          )
                        }
                      </div>
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                    </div>
                  </div>
                </div>
              )
              : <></>
          }
        </Modal.Body>
        <Modal.Footer>
          <ButtonBootsrap className='button-close' variant="secondary" onClick={handleCloseInterviewCreate}>
            Close
          </ButtonBootsrap>
          <ButtonBootsrap variant="primary" onClick={handleCreateInterview}>
            Create
          </ButtonBootsrap>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InterviewTable;