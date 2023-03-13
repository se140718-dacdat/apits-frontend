import React, { useState } from "react";
import { DataGrid, GridApi, GridColDef, GridKeyValue } from '@mui/x-data-grid';
import { Candidate, Specialty } from "../../../model";
import { Button } from '@mui/material';


interface Props {
    candidates: Candidate[];
}

const ViewAssign: React.FC<Props> = ({ candidates }) => {
    const [selectedSpecialties, setSelectedSpecialties] = useState<{
        [id: number]: string;
    }>(
        candidates.reduce(
            (acc, candidate) => ({
                ...acc,
                [candidate.id]: candidate.specialties[0].name,
            }),
            {}
        )
    );


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.8 },
        { field: "gender", headerName: "Gender", flex: 0.5 },
        { field: "address", headerName: "Address", flex: 1.2 },
        {
            field: "specialty",
            headerName: "Specialty",
            flex: 1,
            renderCell: ({ row }) => (
                <select
                    value={selectedSpecialties[row.id]}
                    onChange={(e) =>
                        setSelectedSpecialties({
                            ...selectedSpecialties,
                            [row.id]: e.target.value,
                        })
                    }
                >
                    {row.specialties.map((specialty: Specialty) => (
                        <option key={specialty.id} value={specialty.name}>
                            {specialty.name}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            field: "skills",
            headerName: "Skills",
            flex: 1,
            valueGetter: ({ row }) =>
                row.specialties
                    .find((specialty: Specialty) => specialty.name === selectedSpecialties[row.id])
                    ?.skills.join(", ") ?? "",
        },
        {
            field: 'approve',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <Button variant="contained" color="success">
                    Approve
                </Button>
            ),
        },
        {
            field: 'reject',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <Button variant="contained" color="error">
                    Reject
                </Button>
            ),
        }
        ,
        {
            field: 'detail',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <Button variant="contained" color="primary">
                    Detail
                </Button>
            ),
        },
    ];

    const rows = candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        gender: candidate.gender,
        address: candidate.address,
        specialties: candidate.specialties,
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

export default ViewAssign;