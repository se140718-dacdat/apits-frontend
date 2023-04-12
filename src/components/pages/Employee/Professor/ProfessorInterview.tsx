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
import { SpecialtyEntity } from "../../../../model";


const interviewType = [
  "CHECK",
  "TEST"
]

const ProfessorInterview = () => {
  const user = useSelector((state: any) => state.user.user.user);

  const [type, setType] = useState<string>(interviewType[0])
  const [interviewChecks, setInterviewChecks] = useState<InterviewResponse[]>([]);
  const [interviewTests, setInterviewTests] = useState<InterviewResponse[]>([]);
  const [showInterviewReport, setShowInterviewReport] = useState(false);
  const [specialty, setSpecialty] = useState<SpecialtyEntity>();
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');

  const [checkedCourses, setCheckedCourses] = useState<string[]>([]);

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
    fetchData();
  }, [specialty])

  async function fetchData() {
    const res = await axios.get(`/getInterviewOfProfessorTypeTest?professorId=${user?.id}`);
    const data = await res?.data.data;
    setInterviewTests(data);
    const response = await axios.get(`/getInterviewOfProfessorTypeCheck?professorId=${user?.id}`);
    const dataRes = await response?.data.data;
    setInterviewChecks(dataRes);
  }

  const handlePassCourse = async (candidateId: number, courseId: number) => {
    const request = {
      candidateId: candidateId,
      courseId: courseId
    }
    await axios.put('/status-candidate-course/updateStatusDone', request).then(function (res) {
      console.log(res.data.message)
      if (res.data.message == "SUCCESS") {
        setMessage("Submit successfuly!");
        setMessageStatus("green");
      }
    })
  }

  async function getSpecialtyDetail(id: number) {
    const res = await axios.get(`/special-skill/getSpecialDetail?id=${id}`);
    const data = await res.data.data;
    setSpecialty(data);
    console.log(specialty);
  }

  const tableRenderCheck = () => {

    const rows = interviewChecks?.length > 0 ? interviewChecks?.map((item) => ({
      id: item.id,
      candidateId: item.candidateId,
      link: item.linkMeeting,
      title: item.purpose,
      date: item.date,
      time: item.time,
      duration: item.duration,
      courseId: item.tempId
    })) : [];

    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "title", headerName: "Title", flex: 1.2 },
      { field: "link", headerName: "Link", flex: 1.2 },
      { field: "date", headerName: "Date", flex: 0.8 },
      { field: "time", headerName: "Time", flex: 0.5 },
      { field: "duration", headerName: "Duration", flex: 0.5 },
      {
        field: 'fail',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" style={{ backgroundColor: "red" }} onClick={() => {
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

  const tableRenderTest = () => {
    const rows = interviewTests?.length > 0 ? interviewTests?.map((item) => ({
      id: item.id,
      candidateId: item.candidateId,
      link: item.linkMeeting,
      title: item.purpose,
      date: item.date,
      time: item.time,
      duration: item.duration,
      specialtyId: item.tempId
    })) : [];

    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "title", headerName: "Title", flex: 1.2 },
      { field: "link", headerName: "Link", flex: 1.2 },
      { field: "date", headerName: "Date", flex: 0.8 },
      { field: "time", headerName: "Time", flex: 0.5 },
      { field: "duration", headerName: "Duration", flex: 0.5 },
      {
        field: 'interview',
        headerName: '',
        flex: 0.5,
        width: 170,
        renderCell: (params) => (
          <Button variant="contained" color="warning" onClick={() => {
            console.log(params.row.specialtyId)
            getSpecialtyDetail(params.row.specialtyId);
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
            : tableRenderTest()
        }
      </div>
      <Modal id="InterviewCreateModal" show={showInterviewReport} onHide={handleCloseInterviewReport}>
        <Modal.Header closeButton>
          <Modal.Title>Interview Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{specialty?.name}</div>
          <div>
            {specialty?.skills.map((skill) => {
              return (
                <div>
                  <span>{skill.name}</span>
                  <Form>
                    <div key={`${skill.id}`} className="mb-3">
                      {
                        skill.levels.map((level) =>
                          level.courses.map((course) => {
                            return (
                              <Form.Check
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
          <button onClick={() => { console.log(checkedCourses) }}>Report</button>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProfessorInterview