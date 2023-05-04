import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import { Contract } from "../../../entity";
import ContractView from "../../modules/pagecomponents/common/ContractView";
import "./EnterpriseContract.css";
import moment from "moment";


const EnterpriseContract = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [contract, setContract] = useState<Contract>();
    const [isView, setIsView] = useState<boolean>(false);


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const res = await axios.get(`/contract/getContractByEnterpriseId?enterpriseId=${user?.id}`);
        const data = await res?.data.data;
        setContracts(data);
    }

    const handleShowCreate = () => { setIsView(true) };


    const tableRenderHire = () => {
        const rows = contracts?.length > 0 ? contracts?.map((item) => ({
            id: item.id,
            contract: item,
            position: `${item.interviewDetail.interview.assign.recruitmentRequest.specialty.name} ${item.interviewDetail.interview.assign.recruitmentRequest.experienceSpecialty.name}`,
            candidate: item.interviewDetail.interview.assign.candidate.name,
            paid: item.completePaymentDate,
            dateSign: item.enterpriseSignDate
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "position", headerName: "Position", flex: 1.2 },
            { field: "candidate", headerName: "Candidate", flex: 0.8 },
            {
                field: "dateSign", headerName: "Sign", flex: 0.8,
                renderCell: (params) => (
                    (params.row.dateSign)
                    ? moment(params.row.dateSign.toString()).format('YYYY-MM-DD')
                    : "Not Yet"
                ),
            },
            {
                field: "paid", headerName: "Payment", flex: 0.8,
                renderCell: (params) => (
                    (params.row.dateSign)
                    ? "Paid"
                    : "Not Yet"
                ),
            },
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
        <div id='EnterpriseContract'>
            {
                isView && contract ?
                    <ContractView contractId={contract.id} setIsView={setIsView}/>
                    :
                    renderInterviewDetailList()
            }
        </div>
    )
}

export default EnterpriseContract