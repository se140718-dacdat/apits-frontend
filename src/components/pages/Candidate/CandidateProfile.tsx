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
import { CandidateSkill, PersonalExperience } from '../../../model';
import "./CandidateProfile.css";
import moment from 'moment';
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import { openNewTab } from '../../../handle';
import { CandidateCurrentSpecialty } from '../../../Models';


export const CandidateProfile: FC = () => {
    const user = useSelector((state: any) => state.user?.user?.user);
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const now = new Date();
    const navigate = useNavigate();

    const [showExperience, setShowExperience] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [specialties, setSpecialties] = useState<CandidateCurrentSpecialty[]>([]);
    const [specialty, setSpecialty] = useState<CandidateCurrentSpecialty>();
    const [skills, setSkills] = useState<CandidateSkill[]>([]);
    const [from, setFrom] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [to, setTo] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [issuedTime, setIssuedTime] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));

    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');
    const [experienceName, setExperienceName] = useState<string>("");
    const [experienceDetail, setExperienceDetail] = useState<string>("");



    const [experiences, setExperiences] = useState<PersonalExperience[]>([]);



    useEffect(() => {
        fetchData();
    }, [])

    // useEffect(() => {
    //     getSkills();
    // }, [specialty])

    async function fetchData() {
        await axios.get(`/candidate-level/getListCurrentExpCandidate?candidateId=${user?.id}`).then(async (res) => {
            const data = await res?.data.data;
            setSpecialties(data);
            console.log(data)
            setSpecialty(data[0]);
        });
        await axios.get(`/candidate/getAllPersonalExperience?candidateId=${user?.id}`).then(async (res) => {
            const data = await res?.data.data;
            console.log(data)
            setExperiences(data);
        })
    }

    const handleLinkClick = (url: string) => {
        openNewTab(url);
    };

    // async function getSkills() {
    //     const response = await axios.get(`/candidate-skill-level/getListSkillWithCurrentLevelByCandidateId?candidateId=${user?.id}&specialtyId=${specialty?.specialtyId}`);
    //     setSkills(response.data.data);
    // }

    const handleCloseExperience = () => setShowExperience(false);
    const handleShowExperience = () => setShowExperience(true);

    const handleSelect = (e: CandidateCurrentSpecialty) => {
        setSpecialty(e);
    }

    const handleAddExperience = async () => {
        const request = {
            candidateId: user?.id,
            name: experienceName,
            startFrom: moment(from?.toString()).format('YYYY-MM-DD'),
            endTo: moment(to?.toString()).format('YYYY-MM-DD'),
            detail: experienceDetail
        }
        await axios.post("/candidate/createPersonalExperience", request).then((res) => {
            if (res.data.status === "SUCCESS") {
                setMessage("Add experience successfully!");
                setMessageStatus("green")
            } else {
                setMessage("Add experience fail!");
                setMessageStatus("red")
            }
        })
    }


    return (
        <div id='CandidateProfile' className='clearfix'>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
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
                            {
                                experiences?.map((experience) => {
                                    return (
                                        <div className="profile-body-description">
                                            <h6>{experience.name}  //  {formatDateMonthYear(experience.startFrom)} - {formatDateMonthYear(experience.endTo)}</h6>
                                            <ul>
                                                {experience.detail.split("\n").map((str) =>
                                                    <li>{str}</li>
                                                )}
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="profile-input">
                        <div className="profile-header flex-space-between">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <span className="category-name">{specialty?.name}   <strong>{specialty?.experience}</strong></span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        specialties.map((specialty, index) => {
                                            return (
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => { handleSelect(specialty) }}>{specialty.name}   <strong style={{ color: "var(--primary-color)" }}>{specialty?.experience}</strong></Dropdown.Item>
                                                </div>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="profile-header-name">{specialty?.status}</div>
                        </div>
                        <div className="profile-body verification">
                            {/* {
                                skills?.map((skill) => {
                                    return (
                                        <div className="item" key={skill.id}>
                                            <img src={skill.image} alt="" className='item-icon' />
                                            <strong className='item-name'>{skill.name}</strong>
                                            <span className='item-level'>{skill.level.name}</span>
                                        </div>
                                    )
                                })
                            } */}
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
                        <input className='input-profile' type="text" onChange={(e) => { setExperienceName(e.target.value) }} />
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
                        <textarea className='input-profile' onChange={(e) => { setExperienceDetail(e.target.value) }} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseExperience}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleCloseExperience();
                        handleAddExperience();
                    }}>
                        Add Experience
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
