import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./EnterpriseInterview.css";
import { InterviewResponse } from "../../../entity";
import axios from "../../../api/axios";
import MessageBox from "../../modules/pagecomponents/Popup/MessageBox/MessageBox";


const interviewType = [
  "HIRE"
]

const EnterpriseInterview = () => {
  const user = useSelector((state: any) => state.user.user.user);

  const [type, setType] = useState<string>(interviewType[0])
  const [interviewHires, setInterviewHires] = useState<InterviewResponse[]>([]);
  const [showInterviewReport, setShowInterviewReport] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');


  const handleCloseInterviewReport = () => setShowInterviewReport(false);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const res = await axios.get(`/getInterivewOfEnterprise?enterpriseId=${user?.id}`);
    const data = await res?.data.data;
    setInterviewHires(data);
  }

  const tableRenderHire = () => {

    const rows = interviewHires?.length > 0 ? interviewHires?.map((item) => ({
      id: item.id,
      candidateId: item.candidateId,
      link: item.linkMeeting,
      title: item.purpose,
      date: item.date,
      time: item.time,
      duration: item.duration,
      assignId: item.tmpId
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


  return (
    <div id='EnterpriseInterview'>
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
        {tableRenderHire()}
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

export default EnterpriseInterview