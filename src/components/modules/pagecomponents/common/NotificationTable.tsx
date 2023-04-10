import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Interview } from "../../../../model";
import { Button } from '@mui/material';
import { useSelector } from "react-redux";


interface Props {
  interviews: Interview[];
}

const NotifcationTable: React.FC<Props> = ({ interviews }) => {
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const [columns, setColumns] = useState<GridColDef[]>([]);


  useEffect(() => {
    roleHandle();
    console.log(rows)
  }, [])

  const rows: Interview[] = interviews.map((interview) => ({
    id: interview.id,
    title: interview.title,
    date: interview.date,
    time: interview.time,
    duration: interview.duration,
    participant: interview.participant,
    link: interview.link,
    host: interview.host,
    type: interview.type
  }));

  const roleHandle = () => {
    if (user?.role.name == "ENTERPRISE") {
      setColumns([
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "title", headerName: "Title", flex: 0.8 },
        { field: "date", headerName: "Date", flex: 0.5 },
        { field: "time", headerName: "Time", flex: 0.5 },
        { field: "duration", headerName: "Duration", flex: 0.5 },
        { field: "participant", headerName: "Participant", flex: 0.8 },
        { field: "link", headerName: "Link meeting", flex: 1.2 },
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
        },
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
        }

      ]);
    } else {
      setColumns([
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "type", headerName: "Type", flex: 0.8 },
        { field: "title", headerName: "Title", flex: 0.8 },
        { field: "date", headerName: "Date", flex: 0.5 },
        { field: "time", headerName: "Time", flex: 0.5 },
        { field: "duration", headerName: "Duration", flex: 0.5 },
        { field: "host", headerName: "Host", flex: 0.8 },
        { field: "participant", headerName: "Participant", flex: 0.8 },
        { field: "link", headerName: "Link meeting", flex: 1.2 },
        {
          field: 'edit',
          headerName: '',
          flex: 0.5,
          width: 170,
          renderCell: (params) => (
            <Button variant="contained" style={{backgroundColor: "var(--primary-color)"}}>
              Edit
            </Button>
          ),
        }

      ])
    }
  }

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

export default NotifcationTable;