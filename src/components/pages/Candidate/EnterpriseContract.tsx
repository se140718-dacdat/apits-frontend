import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonGroup, Dropdown, Modal, ToggleButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./EnterpriseContract.css";
import { ContractLarborSupplyResponse } from "../../../entity";
import axios from "../../../api/axios";
import ContractCreateForm from "../Employee/HR/ContractCreateForm";


const EnterpriseContract = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [contracts, setContracts] = useState<ContractLarborSupplyResponse[]>([]);
    const [contract, setContract] = useState<ContractLarborSupplyResponse>();
    const [isCreate, setIsCreate] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const res = await axios.get(`/contract/getContractEnterpriseByCandidate?id=${user?.id}`);
        const data = await res?.data.data;
        setContracts(data);
    }

    const handleShowCreate = () => { setIsCreate(true) };


    const tableRenderHire = () => {
        const rows = contracts?.length > 0 ? contracts?.map((item) => ({
            id: item.id,
            contract: item,
            name: item.name,
        })) : [];

        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 0.2 },
            { field: "name", headerName: "Name", flex: 1.2 },
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
                isCreate ?
                    <ContractCreateForm interviewDetail={undefined} contractAgreement={undefined} contractLaborSupply={contract} setIsCreate={setIsCreate} />
                    :
                    renderInterviewDetailList()
            }
        </div>
    )
}

export default EnterpriseContract