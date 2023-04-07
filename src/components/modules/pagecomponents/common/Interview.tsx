import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Interview } from "../../../../model";
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import { ApprovedEntity, AssignResponse, CandidateCourseProcessing, NewUserInterview } from "../../../../entity";
import { getAllAssignApproved, getAllNewCandidate, getCandidateCourseProcessing } from "../../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";


interface Props {
  type: string;
  id: number;
}

const InterviewTable: React.FC<Props> = ({ type, id }) => {
  const account = useSelector((state: any) => state.auth.login.currentUser);
  const user = useSelector((state: any) => state.user.user.user);
  const navigate = useNavigate();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [assigns, setAssigns] = useState<ApprovedEntity[]>([]);
  const [newUsers, setNewUsers] = useState<NewUserInterview[]>([]);
  const [candidates, setCandidates] = useState<CandidateCourseProcessing[]>([]);


  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setAssigns(await getAllAssignApproved());
    setNewUsers(await getAllNewCandidate());
    setCandidates(await getCandidateCourseProcessing());
  }

  const tableRender = () => {
    switch (type) {
      case "Enterprise":
        const rowsCandidate = assigns.map((item) => ({
          id: item.assignId,
          title: item.recruitmentRequest.title,
          candidateName: item.candidateResponse.name,
          enterpriseName: item.recruitmentRequest.creator.name
        }));

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
              <Button variant="contained" color="primary" onClick={()=> {navigate(`/create-interview/${type}/${params.row.id}`)}}>
                Create
              </Button>
            ),
          },
        ];
        return (<DataGrid rows={rowsCandidate}
          columns={columnsCandidate}
          autoPageSize
          pagination
          checkboxSelection />)
      case "Test":
        const rowsTest = candidates.map((item) => ({
          id: item.id,
          candidateName: item.candidate.name,
          phone: item.candidate.phone,
          courseName: item.course.name,
          courseId: item.course.id
        }));

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
              <Button variant="contained" color="primary" onClick={()=> {navigate(`/create-interview/${type}/${params.row.id}`)}}>
                Create
              </Button>
            ),
          },
        ];
        return (
          <DataGrid rows={rowsTest}
            columns={columnsTest}
            autoPageSize
            pagination
            checkboxSelection />
        )
      default:
        const rows = newUsers.map((item) => ({
          id: item.id,
          candidateName: item.candidate.name,
          phone: item.candidate.phone,
          specialtyName: item.specialty.name,
          specialtyId: item.specialty.id
        }));

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
              <Button variant="contained" color="primary" onClick={()=> {navigate(`/create-interview/${type}/${params.row.id}`)}}>
                Create
              </Button>
            ),
          },
        ];
        return (
          <DataGrid rows={rows}
            columns={columns}
            autoPageSize
            pagination
            checkboxSelection />
        )
    }
  }



  return (
    <div style={{ height: 400, width: "100%" }}>
      {tableRender()}
    </div>
  );
};

export default InterviewTable;