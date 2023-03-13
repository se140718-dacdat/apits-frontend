import React, { useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Candidate, Specialty } from "../../../../model";

interface Props {
  candidates: Candidate[];
}

const CandidateAssign: React.FC<Props> = ({ candidates }) => {
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

export default CandidateAssign;