import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../../../api/axios';
import { SpecialtyExpDetail, SpecialtyResponse } from '../../../entity';
import { CourseEntity, SkillEntity, SpecialtyEntity, Status } from '../../../model';
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import "./CandidateCourse.css";
import { ExperienceSpecialy } from '../../../entity';
import { useNavigate } from 'react-router-dom';
import { CandidateCurrentSpecialty, Course, Experience, Skill } from '../../../Models';

const CandidateCourse = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const navigate = useNavigate();

    const [specialties, setSpecialties] = useState<CandidateCurrentSpecialty[]>([]);
    const [specialtySelect, setSpecialtySelect] = useState<CandidateCurrentSpecialty>();
    const [showCourse, setShowCourse] = useState(false);
    const [course, setCourse] = useState<Course>();
    const [skill, setSkill] = useState<Skill>();
    const [levelId, setLevelId] = useState<number>();
    const [showCertificate, setShowCertificate] = useState(false);
    const [certificate, setCertificate] = useState<string>();
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');
    const [currentExp, setCurrentExp] = useState<Experience>();



    const handleCloseCertificate = () => setShowCertificate(false);
    const handleShowCertificate = () => { setShowCertificate(true) };

    const handleCloseCourse = () => setShowCourse(false);
    const handleShowCourse = (course: Course, skill: Skill) => {
        setCourse(course);
        setSkill(skill);
        setShowCourse(true)
    };


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (specialtySelect !== undefined) {
            getSpecialtyDetail();
        }
    }, [specialtySelect])

    async function fetchData() {
        await axios.get(`/candidate-level/getListCurrentExpCandidate?candidateId=${user?.id}`).then(async (res) => {
            console.log(res)
            const data = await res?.data.data;
            setSpecialties(data);
            setSpecialtySelect(data[0]);
        });
    }

    async function getSpecialtyDetail() {
        await axios.get(`/specialization/getDetailCandidateSpecialization?candidateId=${user?.id}&specialtyId=${specialtySelect?.id}`).then(async (res) => {
            const data = await res.data.data;
            setCurrentExp(data?.experiences.find((e: Experience) => e.name === specialtySelect?.experience));
        });
    }


    const handleStartCourse = async () => {
        const request = {
            candidateId: user?.id,
            courseId: course?.id,
            certificate: ""
        }
        await axios.post('/candidate-course/create', request).then(function (res) {
            console.log(res)
            if (res.data.status == "SUCCESS") {
                setMessage("Started!");
                setMessageStatus("green");
                if (specialtySelect !== undefined) {
                    getSpecialtyDetail();
                }
                window.open(course?.link);
            }
        })
    }

    const handleSubmitCertificate = async () => {
        const request = {
            candidateId: user?.id,
            courseId: course?.id,
            certificate: certificate
        }
        await axios.put('/candidate-course/updateCertificate', request).then(function (res) {
            console.log(res)
            if (res.data.status == "SUCCESS") {
                setMessage("Submit successfuly!");
                setMessageStatus("green");
                if (specialtySelect !== undefined) {
                    getSpecialtyDetail();
                }
            }
        })
        handleCloseCertificate();
        handleCloseCourse();
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "STUDYING":
                status = Status.Studying;
                return status;
            case "PROCESSING":
                status = Status.Processing;
                return status;
            case "DONE":
                status = Status.Done;
                return status;
            case "EXPIRED":
                status = Status.Expired;
                return status;
            case "INTERVIEW":
                status = Status.Studying;
                return status;
            default:
                status = Status.NotStarted;
                return status;
        }
    }

    const renderCourseDetail = () => {
        let status = "";
        let deadlineStr = "";

        // const startAt = new Date(`${course?.startAt}`);
        // const deadline = new Date(startAt.getTime() + 30 * 24 * 60 * 60 * 1000);
        const now = new Date();

        switch (course?.status) {
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
            case "INTERVIEW":
                status = Status.Studying;
                break;
            default:
                status = Status.NotStarted;
                break;
        }

        // if (now > deadline) {
        //     deadlineStr = "Expired";
        // } else {
        //     const diffTime = deadline.getTime() - now.getTime();
        //     const diffDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
        //     deadlineStr = `${diffDays} day(s) left`;
        // }


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
                            {/* {deadlineStr && course?.startAt.toString() !== "NOT YET" && <div className="col3">Deadline</div>} */}
                        </div>
                        <div className="course-row course-data">
                            <div className="col1 hover"><a href={course?.link}>{course?.link}</a></div>
                            <div className="col2" style={{ fontWeight: "bold", color: status }}>{course?.status}</div>
                            {/* {deadlineStr && course?.startAt.toString() !== "NOT YET" && <div className="col3">{deadlineStr}</div>} */}
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

    const renderCourseBtnHandle = (
        deadlineStr: string
    ) => {
        switch (course?.status) {
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
                            handleShowCertificate();
                        }}>
                            Submit Certificate
                        </Button>
                    )
            case "PROCESSING":
            case "INTERVIEW":
                return (
                    <Button variant="primary" onClick={() => {
                        navigate("/candidate-interview");
                        handleCloseCourse();
                    }}>
                        View Interview
                    </Button>
                )
            case "DONE":
                return (
                    null
                )
            default:
                return (
                    <Button variant="primary" onClick={() => {
                        handleCloseCourse();
                        handleStartCourse();
                    }}>
                        Start
                    </Button>
                )
        }

    }

    return (
        <div id='CandidateCourse'>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
            <div className="specialty-container">
                <h2><strong>Win more work with Exams</strong></h2>
                <h5 className='mb-24'>Prove your skills. Pass our Exams. Win more work.</h5>
                <div className="filter">
                    <div className="filter-form-input">
                        <div className="filter-input-icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                        </div>
                        <input type="text" placeholder='Enter search keywords' />
                    </div>
                    <Dropdown className="filter-dropdown ml-8">
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                            <span>{specialtySelect?.name}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='filter-menu'>
                            {
                                specialties?.map((specialty, index) => {
                                    return (
                                        <div key={index}>
                                            <Dropdown.Item className='filter-item' onClick={() => {
                                                setSpecialtySelect(specialty);
                                                getSpecialtyDetail();
                                            }}>{specialty.name}</Dropdown.Item>
                                        </div>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <button className='btn-search ml-8'>Search</button>
                </div>
                <div className="experience-container">
                    <span className="experience-name">You are at the <strong style={{ color: "var(--primary-color)" }}>{currentExp?.name}</strong> level</span>
                    {
                        currentExp !== undefined ? currentExp?.skills?.map((skill) => {
                            return (
                                <div className="skill-container" key={skill.id}>
                                    <span className="skill-name">{skill.name}</span>
                                    <div className="courses">
                                        {skill.levels.map((level) => (
                                            level.courses?.map((course) => {
                                                return (
                                                    <div
                                                        className="course"
                                                        key={course.id}
                                                        onClick={() => handleShowCourse(course, skill)}
                                                    >
                                                        <img src={skill.image} alt="" className="skill-icon" />
                                                        <div className="course-description">
                                                            <span className="course-name">{course.name}</span>
                                                            <div className='level'>
                                                                <span>Level {level.level}</span>
                                                            </div>
                                                            <span className='course-status' style={{ marginRight: "12px", color: getStatusColor(course.status) }}>{course.status}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                        )
                                        }
                                    </div>
                                </div>
                            )
                        })
                            : null
                    }
                </div>
            </div>
            <Modal id="CandidateProfileModal" show={showCertificate} onHide={handleCloseCertificate}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input">
                        <span><img src={skill?.image} alt="" style={{ width: "32px", height: "32px" }} /> {course?.name}</span>
                        <input className='input-profile' type="text" placeholder='Certificate Link' onChange={(e) => { setCertificate(e.target.value) }} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseCertificate}>
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

export default CandidateCourse;