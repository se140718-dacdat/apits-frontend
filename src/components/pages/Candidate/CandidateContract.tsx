import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import { ContractAgreementResponse } from "../../../entity";
import ContractCreateForm from "../Employee/HR/ContractCreateForm";
import "./CandidateContract.css";


const CandidateContract = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [contracts, setContracts] = useState<ContractAgreementResponse[]>([]);
    const [contract, setContract] = useState<ContractAgreementResponse>();
    const [isCreate, setIsCreate] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const res = await axios.get(`/contract/getContractAgreementByCandidate?id=${user?.id}`);
        const data = await res?.data.data;
        setContracts(data);
    }

    const handleShowCreate = () => { setIsCreate(true) };


    const tableRenderHire = () => {
        const rows = contracts?.length > 0 ? contracts?.map((item) => ({
            id: item.id,
            contract: item,
            nameHiring: item.nameHiring,
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "nameHiring", headerName: "Company", flex: 1.2 },
            {
                field: 'interview',
                headerName: '',
                flex: 0.5,
                width: 170,
                renderCell: (params) => (
                    <Button variant="contained" color="warning" onClick={() => {
                        setContract(params.row.contract)
                        handleShowCreate();
                    }}>
                        Detail
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

    const renderInterviewDetailList = () => {
        return (
            <div>
                <h2>Contract</h2>
                <div style={{ height: 400, width: "100%" }}>
                    {tableRenderHire()}
                </div>
            </div>
        )
    }


    return (
        <div id='CandidateContract'>
            {
                isCreate ? 
                <ContractCreateForm interviewDetail={undefined} contractAgreement={contract} contractLaborSupply={undefined} setIsCreate={setIsCreate} />
                : 
                renderInterviewDetailList()
            }
        </div>
    )
}

export default CandidateContract