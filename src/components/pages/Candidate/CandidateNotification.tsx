import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import { Notification } from "../../../model";


interface Props {
    notification: Notification[];
}

const NotificationTable: React.FC<Props> = ({ notification }) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const [columns, setColumns] = useState<GridColDef[]>([]);


    useEffect(() => {
        roleHandle();
        console.log(rows)
    }, [])

    const rows: Notification[] = notification.map((notification) => ({
        id: notification.id,
        title: notification.title,
        date: notification.date,
        time: notification.time,
        WorkForm: notification.WorkForm,
        Salary: notification.Salary,
        Company: notification.Company,
        type: notification.type,
    }));

    const roleHandle = () => {
        setColumns([
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "title", headerName: "Title", flex: 2 },
            { field: "date", headerName: "Date", flex: 0.5 },
            { field: "time", headerName: "Time", flex: 0.5 },
            { field: "WorkForm", headerName: "Work form", flex: 0.5 },
            { field: "Salary", headerName: "Salary", flex: 0.5 },
            { field: "Company", headerName: "Company", flex: 0.8 },

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

export default NotificationTable;