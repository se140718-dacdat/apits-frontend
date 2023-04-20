import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import { InterviewDetail, InterviewResponse } from "../../../entity";
import MessageBox from "../../modules/pagecomponents/Popup/MessageBox/MessageBox";
import "./EnterpriseInterview.css";

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
  const [interviewId, setInterviewId] = useState<number>();
  const [result, setResult] = useState<string>('APPROVE');
  const [description, setDescription] = useState<string>('');


  const handleShowInterviewReport = () => setShowInterviewReport(true);
  const handleCloseInterviewReport = () => setShowInterviewReport(false);


  useEffect(() => {
    fetchData();
  }, [interviewId]);

  async function fetchData() {
    const res = await axios.get(`/getInterivewOfEnterprise?enterpriseId=${user?.id}`);
    const data = await res?.data.data;
    setInterviewHires(data.filter((e: InterviewResponse) => e.status === "PENDING"));
  }

  const handleReport = async () => {
    if (interviewId !== undefined) {
      const request: InterviewDetail = {
        interviewID: interviewId,
        result: result,
        description: description
      }
      await axios.post("/interview-detail/createInterviewDetail", request).then(async (res) => {
        if (res.data.status == "SUCCESS") {
          await axios.put(`/updateInterviewToDone?interviewID=${interviewId}`).then((res) => {
            if (res.data.status === "SUCCESS") {
              setDescription('');
              setResult('APPROVE');
              setInterviewId(undefined);
              setMessage("Report successfuly!");
              setMessageStatus("green");
              fetchData();
              handleCloseInterviewReport();
            } else {
              setMessage("Report fail!");
            }
          });
        }
        else {
          setMessage("Report fail!");
        }
      })
    }
  }

  const tableRenderHire = () => {

    const rows = interviewHires?.length > 0 ? interviewHires?.map((item) => ({
      id: item.id,
      candidateId: item.candidateId,
      link: item.linkMeeting,
      title: item.purpose,
      date: item.date,
      slot: item.slot,
      assignId: item.tempId
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Result</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={result}
              name="radio-buttons-group"
              onChange={(e) => { setResult(e.target.value) }}
            >
              <FormControlLabel value="APPROVE" control={<Radio />} label="Approve" />
              <FormControlLabel value="REJECT" control={<Radio />} label="Reject" />
            </RadioGroup>
          </FormControl>
          <textarea name="result-description" className="p0-14" id="" rows={5} style={{ width: "100%" }} placeholder="Description" required onChange={(e) => { setDescription(e.target.value) }}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={() => { handleReport() }}>Report</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EnterpriseInterview