import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Interview, Slot, slots } from "../../../../model";
import { Button, TextField } from '@mui/material';
import { useSelector } from "react-redux";
import { ApprovedEntity, AssignResponse, CandidateCourseProcessing, Duration, InterviewCreate, InterviewResponse, NewUserInterview, Professor } from "../../../../entity";
import { getAllAssignApproved, getAllEmployees, getAllInterview, getAllNewCandidateUnCheck, getCandidateCourseProcessing } from "../../../../redux/apiRequest";
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
import { CourseProcessing, InterviewCheck, InterviewTest, Waiting } from "../../../../Models";


interface Props {
  type: string;
  status: string;
}

const InterviewTable: React.FC<Props> = ({ type, status }) => {
  const now = new Date();

  const user = useSelector((state: any) => state.user.user.user);
  const [newUsers, setNewUsers] = useState<Waiting[]>([]);
  const [candidates, setCandidates] = useState<CourseProcessing[]>([]);
  const [showInterviewCreate, setShowInterviewCreate] = useState(false);
  const [showInterviewEdit, setShowInterviewEdit] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
  const [link, setLink] = useState<string>('');
  const [slot, setSlot] = useState<string>(slots[0]);
  const [isPopupInterviewer, setIsPopupInterviewer] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');
  const [interviewCheck, setInterviewCheck] = useState<InterviewResponse[]>([]);
  const [interviewTest, setInterviewTest] = useState<InterviewResponse[]>([]);
  const [interview, setInterview] = useState<InterviewResponse>();
  const [slotExist, setSlotExist] = useState<string[]>([]);
  const [evaluateTest, setEvaluateTest] = useState<Waiting>();
  const [courseProcessing, setCourseProcessing] = useState<CourseProcessing>();
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [professor, setProfessor] = useState<Professor>();





  const handleCloseInterviewCreate = () => setShowInterviewCreate(false);
  const handleShowInterviewCreate = () => { setShowInterviewCreate(true); };

  const handleCloseInterviewEdit = () => setShowInterviewEdit(false);
  const handleShowInterviewEdit = () => { setShowInterviewEdit(true) };



  useEffect(() => {
    fetchData();
    console.log(newUsers)
  }, [type, status])

  const fetchData = async () => {
    setNewUsers(await getAllNewCandidateUnCheck());
    setCandidates(await getCandidateCourseProcessing());
  }

  const getSlot = async (id: number) => {
    const request = {
      professorId: id,
      date: moment(date?.toString()).format('YYYY-MM-DD')
    }
    await axios.put("/getByProfessorAndDate", request).then((res) => {
      if (res.data.data !== null) {
        setSlotExist(res.data.data);
      }
      else {
        setSlotExist([])
      }
    })
  }

  const getProfessor = async (id: number) => {
    if (type === "TEST" && evaluateTest !== undefined) {
      await axios.get(`/professor-specialty/getListProfessorBySpecialty?specialtyId=${id}`).then((res) => {
        setProfessors(res.data.data);
      })
    } else {
      await axios.get(`/professor-skill/getListProfesorByCourseId?courseId=${id}`).then((res) => {
        setProfessors(res.data.data);
      })
    }
  }


  const handleEditInterview = async () => {
    const request = {
      purpose: title,
      date: `${moment(date?.toString()).format('YYYY-MM-DD')}`,
      slot: slot,
      linkMeeting: link,
    }
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
        case "CHECK":
          const rowsTest = candidates?.length > 0 ? candidates?.map((item) => ({
            item: item,
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
                  setCourseProcessing(params.row.item);
                  getProfessor(params.row.courseId);
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
            item: item,
            id: item.id,
            candidateName: item.candidate.name,
            phone: item.candidate.phone,
            specialtyName: item.specialty.name,
            specialtyId: item.specialty.id,
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
                  setEvaluateTest(params.row.item);
                  getProfessor(params.row.specialtyId);
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

  const handleCreateCheckInterview = async () => {
    if (courseProcessing !== undefined && professor !== undefined) {
      const request: InterviewCheck = {
        title: title,
        linkMeeting: link,
        date: `${moment(date?.toString()).format('YYYY-MM-DD')}`,
        slot: slot,
        candidateId: courseProcessing.candidate.id,
        courseId: courseProcessing.course.id,
        professorId: professor.id
      }
      try {
        await axios.post("/createCheckEvaluationSession", request).then(async function (res) {
          setMessage(res.data.message);
          setMessageStatus("green");
          handleCloseInterviewCreate();
          await axios.put(`/candidate-course/setStatusByInterview?candidateId=${courseProcessing.candidate.id}&courseId=${courseProcessing.course.id}`);
          fetchData();
        })
      } catch (error) {
        return error
      }
    }
  }

  const handleCreateTestInterview = async () => {
    if (evaluateTest !== undefined && professor !== undefined) {
      const request: InterviewTest = {
        title: title,
        linkMeeting: link,
        date: `${moment(date?.toString()).format('YYYY-MM-DD')}`,
        slot: slot,
        candidateId: evaluateTest.candidate.id,
        specialtyId: evaluateTest.specialty.id,
        professorId: professor.id
      }
      try {
        await axios.post("/createTestEvaluationSession", request).then(async function (res) {
          setMessage(res.data.message);
          setMessageStatus("green");
          handleCloseInterviewCreate();
          await axios.put(`/waiting-list/setStatusChecked?id=${evaluateTest?.id}`);
          fetchData();
        })
      } catch (error) {
        return error
      }
    }
  }

  const handleCreateInterview = () => {
    if (professor) {
      switch (type) {
        case "CHECK":
          handleCreateCheckInterview();
          break;
        case "TEST":
          handleCreateTestInterview();
          break;
        default:
          setMessage("Error")
          setMessageStatus("red")
          break;
      }
    } else {
      setMessage("Error")
      setMessageStatus("red")
    }
  }

  const handleCheckType = () => {
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
                  type === "TEST"
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
                      {courseProcessing?.course.name}
                    </span>
                  </div>
                )
                : type == "TEST"
                  ? (
                    <div className="input-container">
                      <span className="input-title">Specialty:</span>
                      <span className="interview-type">
                        {evaluateTest?.specialty.name}
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
                      (slotExist !== null && slotExist?.includes(slot))
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
                {
                  (type === "CHECK")
                    ?
                    (<span>{courseProcessing?.candidate.name}</span>)
                    :
                    (<span>{evaluateTest?.candidate.name}</span>)
                }

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
                          professors?.map((professor) =>
                            <div className="search-name-interviewer" key={professor.id}
                              onClick={() => {
                                setProfessor(professor);
                                getSlot(professor.id);
                                setIsPopupInterviewer(false);
                              }}>
                              <span>{professor.name}</span>
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
                          professors?.map((professor) =>
                            <div className="search-name-interviewer" key={professor.id}
                              onClick={() => {
                                setProfessor(professor);
                                getSlot(professor.id);
                                setIsPopupInterviewer(false);
                              }}>
                              <span>{professor.name}</span>
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