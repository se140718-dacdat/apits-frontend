import React, { useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Candidate, Category, dataEngineer, developer, Level, level1, level2, level3, Specialty } from "../../../model";
import { Box, Button, Modal, Typography } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles, faCheck, faEnvelope, faHouse, faPhone, faRightToBracket, faUser, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import "./ViewAssign.css";
import { Dropdown } from "react-bootstrap";
import { CandidateForAssign, CandidateResponse } from "../../../entity";

interface Props {
    candidates: CandidateForAssign[];
}

const ViewAssign: React.FC<Props> = ({ candidates }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const [selectedSpecialties, setSelectedSpecialties] = useState<{
    //     [id: number]: string;
    // }>(
    //     candidates.reduce(
    //         (acc, candidate) => ({
    //             ...acc,
    //             [candidate.id]: candidate.specialties[0].name,
    //         }),
    //         {}
    //     )
    // );


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.8 },
        { field: "gender", headerName: "Gender", flex: 0.5 },
        { field: "address", headerName: "Address", flex: 1.2 },
        // {
        //     field: "specialty",
        //     headerName: "Specialty",
        //     flex: 1,
        //     renderCell: ({ row }) => (
        //         <select
        //             className="view-assign-specialty-select"
        //             value={selectedSpecialties[row.id]}
        //             onChange={(e) =>
        //                 setSelectedSpecialties({
        //                     ...selectedSpecialties,
        //                     [row.id]: e.target.value,
        //                 })
        //             }
        //         >
        //             {row.specialties.map((specialty: Specialty) => (
        //                 <option key={specialty.id} value={specialty.name}>
        //                     {specialty.name}
        //                 </option>
        //             ))}
        //         </select>
        //     ),
        // },
        // {
        //     field: "skills",
        //     headerName: "Skills",
        //     flex: 1,
        //     valueGetter: ({ row }) =>
        //         row.specialties
        //             .find((specialty: Specialty) => specialty.name === selectedSpecialties[row.id])
        //             ?.skills.join(", ") ?? "",
        // },
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
        ,
        {
            field: 'detail',
            headerName: '',
            flex: 0.5,
            width: 170,
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={handleOpen}>
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
        // specialties: candidate.specialties,
    }));

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows}
                columns={columns}
                autoPageSize
                pagination
                checkboxSelection />
            <Modal id="ViewAssign"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="profile-container">
                            <div className="left">
                                <div className="profile">
                                    <div className="col-left">
                                        <img src="images/avt.jpg" className='avatar' alt="" />
                                        <div className="join">
                                            <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                            14/12/2000
                                        </div>
                                    </div>
                                    <div className="col-right">
                                        <div className="col-half mb-50">
                                            <div className="fullname">Đắc Đạt</div>
                                        </div>
                                        <div className="b-0">
                                            <div className="col-half">
                                                <div className="work-status">
                                                    <strong>N/A</strong>
                                                    <span>On working</span>
                                                </div>
                                                <div className="work-status">
                                                    <strong>N/A</strong>
                                                    <span>jobs completed</span>
                                                </div>
                                            </div>
                                            <div className="col-half">
                                                <div className="work-status">
                                                    <strong>N/A</strong>
                                                    <span>be hiring</span>
                                                </div>
                                                <div className="work-status">
                                                    <strong>N/A</strong>
                                                    <span>repeat hire rate</span>
                                                </div>
                                            </div>
                                            <div className="col-half">
                                                <div className="work-status">
                                                    <FontAwesomeIcon icon={faPhone} className="icon m-0" />
                                                    <span>0774816851</span>
                                                </div>
                                                <div className="work-status">
                                                    <FontAwesomeIcon icon={faCakeCandles} className="icon m-0" />
                                                    <span>14/12/2000</span>
                                                </div>
                                            </div>
                                            <div className="col-half m-0">
                                                <div className="work-status">
                                                    <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                                    <span>A3/12B, Ấp 1, Xã Vĩnh Lộc A, Huyện Bình Chánh, HCM</span>
                                                </div>
                                                <div className="work-status">
                                                    <FontAwesomeIcon icon={faVenusMars} className="icon m-0" />
                                                    <span>Male</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-input">
                                    <div className="profile-header">
                                        <div className="profile-header-name">Experiences</div>
                                    </div>
                                    <div className="profile-body">
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="profile-input">
                                    <div className="profile-header flex-right">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <span className="category-name">Developer</span>
                                                <span className="level"> Level Beginner</span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>Developer</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="profile-body">
                                        <div className="item">
                                            <img src="" alt="" className="item-icon" />
                                            <span className="item-name">Java</span>
                                            <span className='item-verify'>Certification</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ViewAssign;