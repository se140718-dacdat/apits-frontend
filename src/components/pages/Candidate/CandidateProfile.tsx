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
import { CandidateCourse, CandidateCourses, CourseEntity, SkillEntity, SpecialtyEntity, Status } from '../../../model';
import { startCourse, submitCertificate } from '../../../redux/apiRequest';
import "./CandidateProfile.css";


export const CandidateProfile: FC = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const specialtiesSystem = useSelector((state: any) => state.specialty.specialties.specialty);
    const now = new Date();
    const navigate = useNavigate();

    const [showExperience, setShowExperience] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showSubmitCertificate, setShowSubmitCertificate] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [specialties, setSpecialties] = useState<SpecialtyEntity[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyEntity>();
    const [course, setCourse] = useState<CourseEntity>();
    const [skill, setSkill] = useState<SkillEntity>();
    const [from, setFrom] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [to, setTo] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [issuedTime, setIssuedTime] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [candidateCourses, setCandidateCourses] = useState<CandidateCourses>();
    const [levelId, setLevelId] = useState<number>();
    const [statusId, setStatusId] = useState<number>();
    const [certificate, setCertificate] = useState<string>();


    useEffect(() => {
        fetchData();
        fetchData1();
        console.log(candidateCourses)
    }, [course, certificate])

    const fetchData = async (): Promise<SpecialtyEntity[]> => {
        const response = await axios.get<{ data: { specials: SpecialtyEntity[] } }>(`/canspec/getListSpecsWithCan/${user?.id}`);
        const data = response?.data?.data?.specials;
        if (data) {
            const intersection = specialtiesSystem.filter((element1: SpecialtyEntity) => {
                const element2 = data.find((element: any) => element.id === element1.id);
                return element2 != null;
            });
            setSpecialty(intersection[0]);
            setSpecialties(intersection);
        }
        return data;
    }

    const fetchData1 = async (): Promise<CandidateCourses> => {
        const response = await axios.get<{ data: CandidateCourses }>(`/status-candidate-course/getListCourseByCandidateId?id=${user?.id}`);
        const data = response?.data?.data;
        setCandidateCourses(data);
        return data;
    }
    const handleStartCourse = () => {
        const request = {
            candidateId: user?.id,
            skillId: skill?.id,
            levelId: levelId,
            courseId: course?.id,
            certificate: ""
        }
        console.log(request);
        startCourse(request);
        window.open(course?.link)
    }

    const handleSubmitCertificate = () => {
        const request = {
            id: statusId,
            certificate: certificate
        }
        submitCertificate(request);
        handleCloseSubmitCertificate();
    }

    const renderCourseBtnHandle = (deadlineStr: string) => {
        const tmp = candidateCourses?.courses.find((item: CandidateCourse) => item.id === course?.id)
        if (tmp) {
            switch (tmp?.status) {
                case "STUDYING":
                    return (deadlineStr === "Expired") ?
                        (
                            <Button variant="primary" onClick={() => {
                                handleCloseCourse();
                            }}>
                                Reset Deadline
                            </Button>
                        )
                        : (
                            <Button variant="primary" onClick={() => {
                                setStatusId(tmp?.sccId);
                                console.log(statusId)
                                handleShowSubmitCertificate1();
                            }}>
                                Submit Certificate
                            </Button>
                        )
                case "PROCESSING":
                    return (
                        <Button variant="primary" onClick={() => {
                            handleCloseCourse();
                        }}>
                            View Interview
                        </Button>
                    )
                case "DONE":
                    return (
                        <Button variant="primary" onClick={() => {
                            handleCloseCourse();
                        }}>
                            View Interview
                        </Button>
                    )
                default:
                    <Button variant="primary" onClick={() => {
                        handleStartCourse();
                        handleCloseCourse();
                    }}>
                        Start
                    </Button>
            }
        } else {
            return (
                <Button variant="primary" onClick={() => {
                    handleStartCourse();
                    handleCloseCourse();
                }}>
                    Start
                </Button>
            )
        }
    }

    const renderCourseDetail = () => {
        const tmp = candidateCourses?.courses.find((item: CandidateCourse) => item.id === course?.id);

        let status = "";
        let deadlineStr = "";

        if (tmp) {
            const startAt = new Date(tmp.startAt);
            const deadline = new Date(startAt.getTime() + 30 * 24 * 60 * 60 * 1000);
            const now = new Date();

            switch (tmp.status) {
                case "STUDYING":
                    status = Status.Studying;
                    break;
                case "PROCESSING":
                    status = Status.Processing;
                    break;
                case "DONE":
                    status = Status.Done;
                    break;
                case "EXPIRED":
                    status = Status.Expired;
                    break;
                default:
                    status = Status.NotStarted;
                    break;
            }

            if (now > deadline) {
                deadlineStr = "Expired";
            } else {
                const diffTime = deadline.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
                deadlineStr = `${diffDays} day(s) left`;
            }
        } else {
            status = Status.NotStarted;
        }

        return (
            <Modal id="CandidateSkillModal" show={showCourse} onHide={handleCloseCourse}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="skill-modal-title">
                            <img src={skill?.image} alt="" />
                            <span style={{ fontSize: "1.5rem" }}>{course?.name}</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="skill-content">
                        <div className="course-row course-heading">
                            <div className="col1">Link</div>
                            <div className="col2">Status</div>
                            {deadlineStr && <div className="col3">Deadline</div>}
                        </div>
                        <div className="course-row course-data">
                            <div className="col1">{course?.link}</div>
                            <div className="col2" style={{ fontWeight: "bold", color: status }}>{tmp ? tmp.status : "Not started"}</div>
                            {deadlineStr && <div className="col3">{deadlineStr}</div>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseCourse}>
                        Close
                    </Button>
                    {renderCourseBtnHandle(deadlineStr)}
                </Modal.Footer>
            </Modal>
        );
    };


    const renderDistance = (levelName: string) => {
        const advancedSkills = specialty?.skills
            .flatMap((skill) => {
                const advancedLevels = skill.levels.filter((level) => level.name === levelName);
                if (advancedLevels?.length > 0) {
                    return {
                        ...skill,
                        levels: advancedLevels
                    };
                }
                return null;
            })
            .filter((skill) => skill !== null);

        const courseItems = advancedSkills?.flatMap((skill) => {
            return skill?.levels[0].courses.map((course) => (
                <div className="item" key={course.id}>
                    <div className="hover-primary">
                        <img src={skill.image} alt="" className='item-icon' />
                        <span className='item-name' onClick={(e) => {
                            handleShowCourse(course, skill, skill.levels[0].id);
                        }}>{course?.name}</span>
                    </div>
                    <span className='item-verify' onClick={() => {
                        handleShowSubmitCertificate(course, skill, skill.levels[0].id);
                    }}>Submit certificate</span>
                </div>
            ));
        });

        return <div className='course-list'>{courseItems}</div>;
    }

    const handleCloseExperience = () => setShowExperience(false);
    const handleShowExperience = () => setShowExperience(true);

    const handleCloseCertificate = () => setShowCertificate(false);
    const handleShowCertificate = () => setShowCertificate(true);

    const handleCloseSubmitCertificate = () => setShowSubmitCertificate(false);
    const handleShowSubmitCertificate = (course: CourseEntity, skill: SkillEntity, levelId: number) => {
        setCourse(course);
        setLevelId(levelId);
        setSkill(skill);
        setShowSubmitCertificate(true)
    };

    const handleShowSubmitCertificate1 = () => {
        setShowSubmitCertificate(true)
    };

    const handleCloseCourse = () => setShowCourse(false);
    const handleShowCourse = (course: CourseEntity, skill: SkillEntity, levelId: number) => {
        setCourse(course);
        setSkill(skill);
        setLevelId(levelId);
        setShowCourse(true)
    };

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
                            <img src={user?.image} className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                {user?.createAt && formatDateMonthYear(user?.createAt.slice(0, 10))}
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
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faCakeCandles} className="icon m-0" />
                                        <span>{formatDateMonthYear(user.dob.slice(0, 10))}</span>
                                    </div>
                                </div>
                                <div className="col-half m-0">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                        <span>{user.address}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faVenusMars} className="icon m-0" />
                                        <span>{user.gender}</span>
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
                                    <span className="category-name">{`${specialty?.name}`}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        specialties.map((specialty: SpecialtyEntity, index) => {
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
                        {/* <div className="profile-body">
                            <div className="distance-title">Level Beginner</div>
                            {renderDistance("basic")}
                            <div className="distance-title">Level Advanced</div>
                            {renderDistance("advanced")}
                            <div className="distance-title">Level Intensive</div>
                            {renderDistance("intensive")}
                        </div> */}
                    </div>
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
            <Modal id="CandidateProfileModal" show={showSubmitCertificate} onHide={handleCloseSubmitCertificate}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input">
                        <span><img src={skill?.image} alt="" style={{ width: "32px", height: "32px" }} /> {course?.name}</span>
                        <input className='input-profile' type="text" placeholder='Certificate Link' onChange={(e)=>{setCertificate(e.target.value)}}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseSubmitCertificate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCertificate}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            {renderCourseDetail()}
        </div>
    )
}
