import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../../../api/axios";
import { CandidateConfirmed } from "../../../../entity";
import { Assign, Status } from "../../../../model";
import { assignCandidates } from "../../../../redux/apiRequest";
import { Button } from 'react-bootstrap';
import { openNewTab } from '../../../../handle';

const CandidateAssign = () => {
  const user = useSelector((state: any) => state.user.user.user);
  const { id } = useParams();

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([]);
  const [message, setMessage] = useState('');
  const [candidates, setCandidates] = useState<CandidateConfirmed[]>([]);

  useEffect(() => {
    fetchData();
  }, [])


  async function fetchData() {
    const response = await axios.get(`/recruitmentRequest/getListSuitableCandidates?recruitmentRequestId=${id}`);
    setCandidates(response.data.data);
  }
  const handleLinkClick = (id: number) => {
    openNewTab(`/candidate-detail/${id}`);
  };

  const handleSelectionModelChange = (selectionModel: GridRowId[]) => {
    setSelectedRowIds(selectionModel.map((s) => Number(s)));
  };

  const handleAssign = async () => {
    if (selectedRowIds.length > 0) {
      const request: Assign = {
        assignerId: user?.id,
        candidateIds: selectedRowIds,
        recruitmentRequestId: Number(id)
      }
      setMessage('');
      if (await assignCandidates(request) == 200) {
        fetchData();
      }
    } else {
      setMessage("Please select at least 1 candidate to assign!");
    }
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.8 },
    { field: "gender", headerName: "Gender", flex: 0.5 },
    { field: "address", headerName: "Address", flex: 1.2 },
    {
      field: 'detail',
      headerName: '',
      flex: 0.5,
      width: 170,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => {
          handleLinkClick(params.row.id)
        }
        }>
          Detail
        </Button>
      ),
    }
  ];

  const rows = candidates !== null ? candidates?.map((candidate) => ({
    id: candidate.id.toString(),
    name: candidate.name,
    gender: candidate.gender,
    address: candidate.address,
  })) : [];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        pagination
        checkboxSelection
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={(newSelection) => {
          handleSelectionModelChange(newSelection);
        }}
      />
      <span className="mt-24" style={{ color: Status.Expired, width: "100%", textAlign: "right", display: "block" }}>{message}</span>
      <button className="btn float-right mt-24" onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default CandidateAssign;
