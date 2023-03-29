import React, { FC, useEffect, useState } from 'react'
import "./CandidateProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faPhone, faCakeCandles, faHouse, faVenusMars, faUser, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { CourseEntity, LevelEntity, SkillEntity, SpecialtyEntity } from '../../../model';
import axios from '../../../api/axios';


export const CandidateProfile: FC = () => {
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const user = useSelector((state: any) => state.user.user.user);
    const specialtiesSystem = useSelector((state: any) => state.specialty.specialties.specialty);
    const date = account.createAt.slice(0, 10)
    const now = new Date();
    const navigate = useNavigate();

    const [showExperience, setShowExperience] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [specialties, setSpecialties] = useState<SpecialtyEntity[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyEntity>();
    const [course, setCourse] = useState<CourseEntity>();
    const [from, setFrom] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [to, setTo] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [issuedTime, setIssuedTime] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [basic, setBasic] = useState<CourseEntity[]>([]);
    const [advanced, setAdvanced] = useState<CourseEntity[]>([]);
    const [intensive, setIntensive] = useState<CourseEntity[]>([]);


    useEffect(() => {
        fetchData();
        console.log(course)
    }, [course])

    const fetchData = async (): Promise<SpecialtyEntity[]> => {
        const response = await axios.get<{ data: { candidateSpecialList: SpecialtyEntity[] } }>(`/canspec/getListSpecsWithCan/${user?.id}`);
        const data = response?.data?.data?.candidateSpecialList;
        if (data) {
            const intersection = specialtiesSystem.filter((element1: SpecialtyEntity) => {
                const element2 = data.find((element: any) => element.id === element1.id);
                return element2 != null;
            });
            setSpecialty(intersection[0])
            setSpecialties(intersection);
            setBasic(specialties[0].skills[0].levels[0].courses);
            setAdvanced(specialties[0].skills[1].levels[0].courses);
            setIntensive(specialties[0].skills[2].levels[0].courses);
        }
        return data;
    }

    const handleCloseExperience = () => setShowExperience(false);
    const handleShowExperience = () => setShowExperience(true);

    const handleCloseCertificate = () => setShowCertificate(false);
    const handleShowCertificate = () => setShowCertificate(true);

    const handleClosePayment = () => setShowPayment(false);
    const handleShowPayment = () => setShowPayment(true);

    const handleCloseCourse = () => setShowCourse(false);
    const handleShowCourse = () => setShowCourse(true);
    const handleSelect = (e: SpecialtyEntity) => {
        setSpecialty(e);
    }

    return (
        <div id='CandidateProfile' className='clearfix'>
            <img src="images/banner.jpg" className='banner' alt="" />
            <div className="profile-container">
                <div className="left">
                    <div className="profile">
                        <div className="col-left">
                            <img src="images/avt.jpg" className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                {date}
                            </div>
                        </div>
                        <div className="col-right">
                            <div className="col-half mb-50">
                                <div className="fullname">{user?.name}</div>
                                <div className="btn-cover">
                                    <button className="btn-edit btn" onClick={() => { navigate("/update-candidate") }}>Edit Profile</button>
                                </div>
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
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon m-0 icon={faCakeCandles} className="icon m-0" />
                                        <span>{user.dob.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className="col-half m-0">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                        <span>{user.address}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon m-0 icon={faVenusMars} className="icon m-0" />
                                        <span>{user.gender}</span>
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
                        <div className="profile-header">
                            <div className="profile-header-name">Verifications</div>
                        </div>
                        <div className="profile-body verification">
                            <div className="item">
                                <FontAwesomeIcon icon={faUser} className="item-icon" />
                                <span className="item-name">identity verified</span>
                                <span className='item-verify' onClick={() => { navigate('/update-candidate') }}>Verify</span>
                            </div>
                            <div className="item">
                                <FontAwesomeIcon icon={faEnvelope} className="item-icon" />
                                <span className="item-name">email verified</span>
                                <FontAwesomeIcon icon={faCheck} className="item-icon icon-check" />
                            </div>
                            <div className="item">
                                <img src="data:image/png;base64,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" alt="" className='item-icon' />
                                <span className="item-name">Payment verified</span>
                                <span className='item-verify' onClick={handleShowPayment}>Edit</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header flex-right">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <span className="category-name">{`${specialty?.name}`}</span>
                                    {/* <span className="level">{` Level ${levelList.find(lv => lv.levelId == category.levelId)?.levelName}`}</span> */}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        specialties.map((specialty: SpecialtyEntity, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => { handleSelect(specialty) }}>{specialty.name}</Dropdown.Item>
                                                </div>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="profile-body">
                            <div className="distance-title">Level Beginner</div>
                            <ul className='course-list'>
                                {
                                    basic?.map((course: CourseEntity, index: number) => {
                                        return (
                                            <li className='course-item' key={index}>
                                                <span>{course?.name}</span>
                                                <span className='course-view' onClick={() => {
                                                    setCourse(course);
                                                    handleShowCourse();
                                                }}>View</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="distance-title">Level Advanced</div>
                            <ul className='course-list'>
                                {
                                    advanced?.map((course: CourseEntity, index: number) => {
                                        return (
                                            <li className='course-item' key={index}>
                                                <span>{course?.name}</span>
                                                <span className='course-view' onClick={() => {
                                                    setCourse(course);
                                                    handleShowCourse();
                                                }}>View</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="distance-title">Level Intensive</div>
                            <ul className='course-list'>
                                {
                                    intensive?.map((course: CourseEntity, index: number) => {
                                        return (
                                            <li className='course-item' key={index}>
                                                <span>{course?.name}</span>
                                                <span className='course-view' onClick={() => {
                                                    setCourse(course);
                                                    handleShowCourse();
                                                }}>View</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
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
            <Modal id="CandidateProfileModal" show={showPayment} onHide={handleClosePayment}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input">
                        <span><img src="data:image/png;base64,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" alt="" style={{ width: "32px", height: "32px" }} /> VNPay Number</span>
                        <input className='input-profile' type="text" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleClosePayment}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClosePayment}>
                        Verify
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal id="CandidateSkillModal" show={showCourse} onHide={handleCloseCourse}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="skill-modal-title">
                            <span style={{ fontSize: "2rem" }}>{course?.name}</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="skill-content">
                        <div className="course-row course-heading">
                            <div className="col1">Link</div>
                            <div className="col2">Status</div>
                            <div className="col3">Certificate</div>
                        </div>
                        <div className="course-row course-data">
                            <div className="col1">{course?.link}</div>
                            <div className="col2" style={{ fontWeight: "bold", color: "green" }}>{course?.status}</div>
                            <div className="col3"><button className='btn-certificate'>Submit</button></div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseCourse}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseCourse}>
                        Start
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
