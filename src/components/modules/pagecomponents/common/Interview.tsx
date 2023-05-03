import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Interview, Slot, slots } from "../../../../model";
import { Button, TextField } from '@mui/material';
import { useSelector } from "react-redux";
import { ApprovedEntity, AssignResponse, CandidateCourseProcessing, Duration, InterviewCreate, InterviewResponse, NewUserInterview, Professor } from "../../../../entity";
import { getAllAssignApproved, getAllEmployees, getAllInterview, getAllNewCandidate, getCandidateCourseProcessing } from "../../../../redux/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./Interview.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose, faMagnifyingGlass, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button as ButtonBootsrap } from 'react-bootstrap';
import MessageBox from "../Popup/MessageBox/MessageBox";
import axios from "../../../../api/axios";
import moment from "moment";


interface Props {
  type: string;
  status: string;
}

const InterviewTable: React.FC<Props> = ({ type, status }) => {
  const now = new Date();

  const user = useSelector((state: any) => state.user.user.user);
  const [assigns, setAssigns] = useState<ApprovedEntity[]>([]);
  const [newUsers, setNewUsers] = useState<NewUserInterview[]>([]);
  const [candidates, setCandidates] = useState<CandidateCourseProcessing[]>([]);
  const [showInterviewCreate, setShowInterviewCreate] = useState(false);
  const [showInterviewEdit, setShowInterviewEdit] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
  const [link, setLink] = useState<string>('');
  const [slot, setSlot] = useState<string>(slots[0]);
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
  const [testId, setTestId] = useState<number>();
  const [interviewAssign, setInterviewAssign] = useState<InterviewResponse[]>([]);
  const [interviewCheck, setInterviewCheck] = useState<InterviewResponse[]>([]);
  const [interviewTest, setInterviewTest] = useState<InterviewResponse[]>([]);
  const [interviews, setInterviews] = useState<InterviewResponse[]>([]);
  const [interview, setInterview] = useState<InterviewResponse>();
  const [slotExist, setSlotExist] = useState<string[]>([]);



  const handleCloseInterviewCreate = () => setShowInterviewCreate(false);
  const handleShowInterviewCreate = () => { setShowInterviewCreate(true) };

  const handleCloseInterviewEdit = () => setShowInterviewEdit(false);
  const handleShowInterviewEdit = () => { setShowInterviewEdit(true) };



  useEffect(() => {
    fetchData();
    console.log(interviews)
  }, [type, status])

  const fetchData = async () => {
    setAssigns(await getAllAssignApproved());
    setNewUsers(await getAllNewCandidate());
    setCandidates(await getCandidateCourseProcessing());
    setEmployees(await getAllEmployees());
    setInterviews(await getAllInterview());
    setInterviewAssign(interviews.filter((e) => e.type === "HIRE"));
    setInterviewCheck(interviews.filter((e) => e.type === "CHECK"));
    setInterviewTest(interviews.filter((e) => e.type === "TEST"));
  }

  const getSlot = async (id: number) => {
    console.log(moment(date?.toString()).format('YYYY-MM-DD'));
    if (type !== "HIRE") {
      await axios.get(`/getListSlotByProfessorInDate?professorId=${id}&date=${moment(date?.toString()).format('YYYY-MM-DD')}`).then((res) => {
        setSlotExist(res.data.data);
      })
    } else {
      await axios.get(`/getListSlotByProfessorInDate?professorId=${id}&date=${moment(date?.toString()).format('YYYY-MM-DD')}`).then((res) => {
        setSlotExist(res.data.data);
      })
    }
  }

  const createInterview = async (request: InterviewCreate) => {
    try {
      await axios.post("/createInterview", request).then(async function (res) {
        setMessage(res.data.message);
        setMessageStatus("green");
        handleCloseInterviewCreate();
        if (type === "TEST") {
          await axios.put(`/waiting-list/setStatusChecked?id=${testId}`);
          fetchData();
        }
        if (type === "CHECK") {
          await axios.put(`/status-candidate-course/updateStatusInterview?candidateId=${request.candidateId}&coursesId=${request.tmpId}`);
          fetchData();
        }
        if (type === "HIRE") {
          await axios.put(`/assign/interviewStatusbyEmployee/{id}?id=${request.tmpId}&employeeId=${user?.id}`);
          fetchData();
        }
      })
    } catch (error) {
      return error
    }
  }

  const handleEditInterview = async () => {
    const request = {
      purpose: title,
      date: `${moment(date?.toString()).format('YYYY-MM-DD')}`,
      slot: slot,
      linkMeeting: link,
    }
    console.log(request)
    try {
      await axios.put(`/updateInterviewById?id=${interview?.id}`, request).then(async function (res) {
        setMessage(res.data.message);
        setMessageStatus("green");
        handleCloseInterviewEdit();
        setDate(dayjs(now.toLocaleDateString()))
        fetchData();
      })
    } catch (error) {
      return error
    }
  }

  const tableRender = () => {
    if (status === "WAITING") {
      switch (type) {
        case "HIRE":
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
            candidateId: item.candidate.id,
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
                  setParticipantAId(params.row.candidateId);
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
          const rows = newUsers?.length > 0 ? newUsers?.map((item) => ({
            id: item.id,
            candidateId: item.candidate.id,
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
                  setParticipantAId(params.row.candidateId);
                  setSpecialty(params.row.specialtyName);
                  setTestId(params.row.id);
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
    } else {
      switch (type) {
        case "HIRE":
          const rowsCandidate = interviewAssign?.length > 0 ? interviewAssign.map((item) => ({
            id: item.id,
            title: item.purpose,
            link: item.linkMeeting,
            candidateName: item.candidateName,
            date: item.date,
            slot: item.slot,
            interview: item
          })) : [];
          const columnsCandidate: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 0.8 },
            {
              field: 'link',
              headerName: 'Link',
              flex: 1.2,
              renderCell: (params) => (
                <a href={params.row.link}>{params.row.link}</a>
              )
            },
            { field: "candidateName", headerName: "Candidate", flex: 1.2 },
            { field: "date", headerName: "Date", flex: 0.5 },
            { field: "slot", headerName: "Slot", flex: 0.8 },

            {
              field: 'interview',
              headerName: '',
              flex: 0.5,
              width: 170,
              renderCell: (params) => (
                <Button variant="contained" color="primary" style={{ backgroundColor: "var(--primary-color)" }} onClick={() => {
                  setInterview(params.row.interview)
                  setDate(dayjs(params.row.date))
                  setLink(params.row.link)
                  setSlot(params.row.slot)
                  setTitle(params.row.title)
                  handleShowInterviewEdit();
                }}>
                  Edit
                </Button>
              ),
            },
          ];
          return (<DataGrid rows={rowsCandidate}
            columns={columnsCandidate}
            autoPageSize
            pagination />)
        case "CHECK":
          const rowsTest = interviewCheck?.length > 0 ? interviewCheck?.map((item) => ({
            id: item.id,
            title: item.purpose,
            link: item.linkMeeting,
            candidateName: item.candidateName,
            date: item.date,
            slot: item.slot,
            interview: item
          })) : [];

          const columnsTest: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 0.8 },
            {
              field: 'link',
              headerName: 'Link',
              flex: 1.2,
              renderCell: (params) => (
                <a href={params.row.link}>{params.row.link}</a>
              )
            },
            { field: "candidateName", headerName: "Candidate", flex: 1.2 },
            { field: "date", headerName: "Date", flex: 0.5 },
            { field: "slot", headerName: "Slot", flex: 0.8 },
            {
              field: 'interview',
              headerName: '',
              flex: 0.5,
              width: 170,
              renderCell: (params) => (
                <Button variant="contained" color="primary" style={{ backgroundColor: "var(--primary-color)" }} onClick={() => {
                  setInterview(params.row.interview)
                  setDate(dayjs(params.row.date))
                  setLink(params.row.link)
                  setSlot(params.row.slot)
                  setTitle(params.row.title)
                  handleShowInterviewEdit();
                }}>
                  Edit
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
          const rows = interviewTest?.length > 0 ? interviewTest?.map((item) => ({
            id: item.id,
            title: item.purpose,
            link: item.linkMeeting,
            candidateName: item.candidateName,
            date: item.date,
            slot: item.slot,
            interview: item
          })) : [];

          const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 0.8 },
            {
              field: 'link',
              headerName: 'Link',
              flex: 1.2,
              renderCell: (params) => (
                <a href={params.row.link}>{params.row.link}</a>
              )
            },
            { field: "candidateName", headerName: "Candidate", flex: 1.2 },
            { field: "date", headerName: "Date", flex: 0.5 },
            { field: "slot", headerName: "Slot", flex: 0.8 },
            {
              field: 'interview',
              flex: 0.5,
              width: 170,
              renderCell: (params) => (
                <Button variant="contained" color="primary" style={{ backgroundColor: "var(--primary-color)" }} onClick={() => {
                  setInterview(params.row.interview)
                  setDate(dayjs(params.row.date))
                  setLink(params.row.link)
                  setSlot(params.row.slot)
                  setTitle(params.row.title)
                  handleShowInterviewEdit();
                }}>
                  Edit
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
  }

  const handleCreateInterview = () => {
    switch (type) {
      case "CHECK":
        if (courseId !== undefined && participantAId !== undefined && professor !== undefined) {
          const request: InterviewCreate = {
            purpose: title,
            date: `${moment(date?.toString()).format('YYYY-MM-DD')}`,
            slot: slot,
            description: "",
            linkMeeting: link,
            type: type.toUpperCase(),
            managerId: user?.id,
            tmpId: courseId,
            candidateId: participantAId,
            hostId: professor?.id
          }
          createInterview(request);
        } else {
          console.log("ERROR")
        }
        break;

      case "HIRE":
        if (assignId !== undefined && participantAId !== undefined && participantBId !== undefined && professor !== undefined) {
          const request: InterviewCreate = {
            purpose: title,
            description: "",
            date: `${moment(date?.toString()).format('YYYY-MM-DD')}`,
            slot: slot,
            linkMeeting: link,
            type: type.toUpperCase(),
            managerId: professor?.id,
            tmpId: assignId,
            candidateId: participantAId,
            hostId: participantBId
          }
          createInterview(request);
        } else {
          console.log("ERROR")
        }
        break;

      default:
        if (specialtyId !== undefined && participantAId !== undefined && professor !== undefined) {
          const request: InterviewCreate = {
            purpose: title,
            description: "",
            date: `${moment(date?.toString()).format('YYYY-MM-DD')}`,
            slot: slot,
            linkMeeting: link,
            type: type.toUpperCase(),
            managerId: user?.id,
            tmpId: specialtyId,
            candidateId: participantAId,
            hostId: professor?.id
          }
          createInterview(request);
        } else {
          console.log("ERROR")
        }
        break;
    }
  }

  const handleCheckType = () => {
    if (type === "HIRE") {
      return (
        <div>
          <div className="participant-container">
            <span className="participant-title">Enterprise:</span>
            <div className="participant__name btn-item hover">
              <span>{participantB}</span>
            </div>
          </div>
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
      {
        message != '' ?
          <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
          :
          null
      }
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
                  type == "HIRE"
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
                  label="Expected start date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="input-container">
              <span className="input-title">Expected slot:</span>
              <div className="gr-right form-input-select">
                <select className="form-select select-duration" onChange={e => setSlot(e.target.value)}>
                  {
                    slots?.map((slot) =>
                      (slotExist.includes(slot))
                        ?
                        <option disabled value={slot}>{slot}</option>
                        :
                        <option value={slot}>{slot}</option>
                    )
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
                                getSlot(employee.id);
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
      <Modal id="InterviewCreateModal" show={showInterviewEdit} onHide={handleCloseInterviewEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Meeting form section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="detail-container">
            <h3>Detailed information</h3>
            <div className="input-container">
              <span className="input-title">Title:</span>
              <input type="text" placeholder={interview?.purpose} value={title} onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className="input-container">
              <span className="input-title">Interview Type:</span>
              <span className="interview-type">
                {
                  type == "HIRE"
                    ? "Interview with Enterprise"
                    : type == "TEST"
                      ? "Test specialty with Professor"
                      : "Check course with Professor"
                }
              </span>
            </div>
            <div className="input-container">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Expected start date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(dayjs(newValue));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="input-container">
              <span className="input-title">Expected slot:</span>
              <div className="gr-right form-input-select">
                <select className="form-select select-duration" onChange={e => setSlot(e.target.value)} defaultValue={interview?.slot}>
                  {
                    slots?.map((slos) =>
                      (slotExist.includes(slos))
                        ?
                        <option disabled value={slos}>{slos}</option>
                        :
                        null
                    )
                  }
                </select>
              </div>
            </div>
            <div className="input-container">
              <span className="input-title">Link interview:</span>
              <input type="text" placeholder="Link meeting" value={link} onChange={(e) => { setLink(e.target.value) }} />
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
                                getSlot(employee.id);
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
          <ButtonBootsrap variant="primary" onClick={handleEditInterview}>
            Edit
          </ButtonBootsrap>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InterviewTable;