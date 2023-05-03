import { faCakeCandles, faCheck, faEnvelope, faHouse, faPhone, faRightToBracket, faUser, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { formatDateMonthYear, getCVName } from '../../../convert';
import { SpecialtyExpResponse } from '../../../entity';
import { CandidateSkill } from '../../../model';
import "./CandidateProfile.css";


export const CandidateProfile: FC = () => {
    const user = useSelector((state: any) => state.user?.user?.user);
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const now = new Date();
    const navigate = useNavigate();

    const [showExperience, setShowExperience] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [specialties, setSpecialties] = useState<SpecialtyExpResponse[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyExpResponse>();
    const [skills, setSkills] = useState<CandidateSkill[]>([]);
    const [from, setFrom] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [to, setTo] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [issuedTime, setIssuedTime] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        getSkills();
    }, [specialty])

    async function fetchData() {
        await axios.get(`/canspec/getSESLCandidateSpecialExp?candidateId=${user?.id}`).then(async (res) => {
            const data = await res?.data.data.specialties;
            setSpecialties(data);
            setSpecialty(data[0]);
        });
    }

    async function getSkills() {
        const response = await axios.get(`/candidate-skill-level/getListSkillWithCurrentLevelByCandidateId?candidateId=${user?.id}&specialtyId=${specialty?.specialtyId}`);
        setSkills(response.data.data);
    }

    const handleCloseExperience = () => setShowExperience(false);
    const handleShowExperience = () => setShowExperience(true);

    const handleCloseCertificate = () => setShowCertificate(false);
    const handleShowCertificate = () => setShowCertificate(true);

    const handleSelect = (e: SpecialtyExpResponse) => {
        setSpecialty(e);
    }

    return (
        <div id='CandidateProfile' className='clearfix'>
            <img src="images/banner.jpg" className='banner' alt="" />
            <div className="profile-container">
                <div className="left">
                    <div className="profile">
                        <div className="col-left">
                            <img src={user?.image} className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                {account?.createAt && formatDateMonthYear(account?.createAt.slice(0, 10))}
                            </div>
                        </div>
                        <div className="col-right">
                            <div className="col-half mb-50">
                                <div className="fullname">{user?.name}</div>
                                <div className="btn-cover">
                                    <button className="btn-edit btn" onClick={() => { navigate("/update-candidate") }}>Edit Profile</button>
                                </div>
                            </div>
                            <div>
                                <div className="col-half">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faPhone} className="icon m-0" />
                                        <span>{user?.phone}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faCakeCandles} className="icon m-0" />
                                        <span>{formatDateMonthYear(user?.dob.slice(0, 10))}</span>
                                    </div>
                                </div>
                                <div className="col-half m-0">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                        <span>{user?.address}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faVenusMars} className="icon m-0" />
                                        <span>{user?.gender}</span>
                                    </div>
                                </div>
                                <div className="col-half">
                                    <div className="work-status">
                                        <span className='m-0 profile-title'>CV</span>
                                        <Link to={user?.cv} style={{ marginLeft: "24px" }}>{(user?.cv) ? getCVName(user?.cv) : ""}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header">
                            <div className="profile-header-name">Experiences</div>
                            <Button variant="primary" onClick={handleShowExperience}>
                                Add Experience
                            </Button>
                        </div>
                        <div className="profile-body">
                            <div className="profile-body-description">
                                <h6>FPT Software Intern  //  Jan 2022 - April 2022</h6>
                                <ul>
                                    <li>Collaborated with cross-functional teams to complete projects related to medical</li>
                                    <li>Participated in team meetings and contributed to group brainstorming sessions</li>
                                    <li>Completed feature and fix bug for application functional</li>
                                </ul>
                            </div>
                            <div className="profile-body-description">
                                <h6>FPT Software Intern  //  Jan 2022 - April 2022</h6>
                                <ul>
                                    <li>Collaborated with cross-functional teams to complete projects related to medical</li>
                                    <li>Participated in team meetings and contributed to group brainstorming sessions</li>
                                    <li>Completed feature and fix bug for application functional</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header">
                            <div className="profile-header-name">Certification</div>
                            <Button variant="primary" onClick={handleShowCertificate}>
                                Add Certificate
                            </Button>
                        </div>
                        <div className="profile-body">
                            <div className="profile-body-description">
                                <h6>March 28, 2020</h6>
                                <div className='certificate-link'>Basic of Web Developement & Coding (Coursera)
                                </div>
                            </div>
                            <div className="profile-body-description">
                                <h6>March 11, 2023</h6>
                                <div className='certificate-link'>Building mordern java application (Coursera)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="profile-input">
                        <div className="profile-header flex-space-between">
                            <div className="profile-header-name">Specialty</div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <span className="category-name">{specialty?.specialtyName}   <strong>{specialty?.expName}</strong></span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        specialties.map((specialty, index) => {
                                            return (
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => { handleSelect(specialty) }}>{specialty.specialtyName}   <strong style={{ color: "var(--primary-color)" }}>{specialty?.expName}</strong></Dropdown.Item>
                                                </div>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="profile-body verification">
                            {
                                skills?.map((skill) => {
                                    return (
                                        <div className="item" key={skill.id}>
                                            <img src={skill.image} alt="" className='item-icon' />
                                            <strong className='item-name'>{skill.name}</strong>
                                            <span className='item-level'>{skill.level.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header">
                            <div className="profile-header-name">Description</div>
                        </div>
                        <div className="profile-body verification">
                            <span>{user?.description}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal id="CandidateProfileModal" show={showExperience} onHide={handleCloseExperience}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Experiences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input">
                        <span>Experience Name</span>
                        <input className='input-profile' type="text" />
                    </div>
                    <div className="col-haft" style={{ padding: "12px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="From"
                                value={from}
                                onChange={(newValue) => {
                                    setFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="To"
                                value={to}
                                onChange={(newValue) => {
                                    setTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="input">
                        <span>Experience Detail</span>
                        <textarea className='input-profile' />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseExperience}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseExperience}>
                        Add Experience
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id="CandidateProfileModal" show={showCertificate} onHide={handleCloseCertificate}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Certificates</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input">
                        <span>Certificate Name</span>
                        <input className='input-profile' type="text" />
                    </div>
                    <div className="input">
                        <span>Certificate Link</span>
                        <input className='input-profile' />
                    </div>
                    <div className="issued-time">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Issued Time"
                                value={issuedTime}
                                onChange={(newValue) => {
                                    setIssuedTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseCertificate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseCertificate}>
                        Add Certificate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
