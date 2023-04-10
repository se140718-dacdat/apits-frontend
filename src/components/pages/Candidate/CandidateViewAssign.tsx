import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';
import { AssignResponse, CandidateAssignRow } from '../../../entity';
import { getDaysLeft } from '../../../handle';
import { confirmAssign } from '../../../redux/apiRequest';
import "./CandidateViewAssign.css";

const CandidateViewAssign = () => {
  const user = useSelector((state: any) => state.user.user.user);

  const [assigns, setAssigns] = useState<AssignResponse[]>([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (): Promise<AssignResponse[]> => {
    const response = await axios.get<{ data: AssignResponse[]}>(`/assign/getListAssignByCandidateId?candidateId=${user?.id}`);
    const data = response?.data?.data;
    setAssigns(data);
    return data;
  }


  const handleConfirmAssign = (id: number) => {
    confirmAssign(id, user?.id);
  }

  const rows: CandidateAssignRow[] = assigns?.map((assign) => ({
    id: assign?.id.toString(),
    recruitment: assign?.recruitmentRequest.title,
    specialty: assign?.recruitmentRequest.specialty,
    salaryFrom: assign?.recruitmentRequest.salaryFrom,
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
    { field: "specialty", headerName: "Specialty", flex: 1.2 },
    { field: "salaryFrom", headerName: "Salary", flex: 1.2 },
    { field: "typeOfWork", headerName: "Work Form", flex: 1.2 },
    { field: "deadline", headerName: "Deadline", flex: 1.2 },
    {
      field: 'confirm',
      headerName: '',
      flex: 0.8,
      width: 170,
      renderCell: (params) => (
        (params.row.status !== "CONFIRM") ? 
        <Button variant="contained" color="success" onClick={()=>{handleConfirmAssign(params.row.id)}}>
          Confirm
        </Button>
        : <div>Confirmed</div>
      ),
    }
  ]



  return (
    <div id='CandidateViewAssign'>
      <h2>List job for you</h2>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
          pagination
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default CandidateViewAssign