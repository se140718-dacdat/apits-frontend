import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';
import { AssignResponse, CandidateAssignRow } from '../../../entity';
import { getDaysLeft } from '../../../handle';
import { currencyMaskString } from '../../../mask';
import { Status } from "../../../model";
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import "./CandidateViewAssign.css";

const CandidateViewAssign = () => {
  const user = useSelector((state: any) => state.user.user.user);

  const [assigns, setAssigns] = useState<AssignResponse[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (): Promise<AssignResponse[]> => {
    const response = await axios.get<{ data: AssignResponse[] }>(`/assign/getListAssignByCandidateId?candidateId=${user?.id}`);
    const data = response?.data?.data;
    setAssigns(data);
    console.log(data);
    return data;
  }


  const handleConfirmAssign = async (id: number) => {
    await axios.put(`/assign/approvedByCandidate/{id}?id=${id}&candidateId=${user?.id}`).then((res) => {
      if (res.data.status === "SUCCESS") {
        fetchData();
        setMessage(res.data.message);
        setMessageStatus("green");
      } else {
        setMessage("Confirm fail! Please try again");
        setMessageStatus("red");
      }
    })
  }

  const rows: CandidateAssignRow[] = assigns?.map((assign) => ({
    id: assign?.id.toString(),
    recruitment: assign?.recruitmentRequest.title,
    specialty: assign?.recruitmentRequest.specialty.name,
    experience: assign?.recruitmentRequest.experienceSpecialty.name,
    salaryDetail: currencyMaskString(assign?.recruitmentRequest.salaryDetail),
    typeOfWork: assign?.recruitmentRequest.typeOfWork,
    deadline: getDaysLeft(assign?.recruitmentRequest?.createAt, assign?.recruitmentRequest?.expiryDate) > 0 ? `${getDaysLeft(assign?.recruitmentRequest?.createAt, assign?.recruitmentRequest?.expiryDate)} days left to apply` : "Expired",
    recruitmentId: assign.recruitmentRequest.id,
    status: assign.status
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "recruitment",
      headerName: "Recruitment",
      flex: 1.5,
      renderCell: (params) => (
        <Link to={`/post-detail/${params.row.recruitmentId}`} className='link'>
          {params.value}
        </Link>
      ),
    },
    {
      field: "specialty", headerName: "Position", flex: 1.2,
      renderCell: (params) => (
        <div>{params.row.specialty} <strong>{params.row.experience}</strong></div>
      )
    },
    { field: "salaryDetail", headerName: "Salary", flex: 1.2 },
    { field: "typeOfWork", headerName: "Work Form", flex: 1.2 },
    { field: "deadline", headerName: "Deadline", flex: 1.2 },
    {
      field: 'confirm',
      headerName: '',
      flex: 0.8,
      width: 170,
      renderCell: (params) => (
        (params.row.status !== "CONFIRM") ?
          <Button variant="contained" color="success" onClick={() => { handleConfirmAssign(params.row.id) }}>
            Confirm
          </Button>
          : <div style={{ color: `${Status.Done}`, fontWeight: "700" }}>Confirmed</div>
      ),
    }
  ]



  return (
    <div id='CandidateViewAssign'>
      {
        message != '' ?
          <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
          :
          null
      }
      <h2>List job for you</h2>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
          pagination
        />
      </div>
    </div>
  )
}

export default CandidateViewAssign