import React, { useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Interview } from "../../../../model";
import { Button } from '@mui/material';


interface Props {
  interviews: Interview[];
}

const InterviewTable: React.FC<Props> = ({ interviews }) => {


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "title", headerName: "Title", flex: 0.8 },
    { field: "date", headerName: "Date", flex: 0.5 },
    { field: "time", headerName: "Time", flex: 0.5 },
    { field: "duration", headerName: "Duration", flex: 0.5 },
    { field: "participant", headerName: "Participant", flex: 0.8 },
    { field: "link", headerName: "Link meeting", flex: 1.2 },
    {
      field: 'approve',
      headerName: '',
      flex: 0.5,
      width: 170,
      renderCell: (params) => (
          <Button variant="contained" color="success">
              Approve
          </Button>
      ),
  },
  {
      field: 'reject',
      headerName: '',
      flex: 0.5,
      width: 170,
      renderCell: (params) => (
          <Button variant="contained" color="error">
              Reject
          </Button>
      ),
  }

  ];

  const rows = interviews.map((interview) => ({
    id: interview.id,
    title: interview.title,
    date: interview.date,
    time: interview.time,
    duration: interview.duration,
    participant: interview.participant,
    link: interview.link,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows}
        columns={columns}
        autoPageSize
        pagination
        checkboxSelection />
    </div>
  );
};

export default InterviewTable;