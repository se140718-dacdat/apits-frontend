import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../../../api/axios';
import { SpecialtyResponse } from '../../../entity';
import { CourseEntity, SkillEntity, SpecialtyEntity, Status } from '../../../model';
import { startCourse } from '../../../redux/apiRequest';
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import "./CandidateCourse.css";

const CandidateCourse = () => {
    const user = useSelector((state: any) => state.user.user.user);

    const [specialties, setSpecialties] = useState<SpecialtyResponse[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyEntity>();
    const [specialtySelect, setSpecialtySelect] = useState<SpecialtyResponse>();
    const [showCourse, setShowCourse] = useState(false);
    const [course, setCourse] = useState<CourseEntity>();
    const [skill, setSkill] = useState<SkillEntity>();
    const [levelId, setLevelId] = useState<number>();
    const [showCertificate, setShowCertificate] = useState(false);
    const [certificate, setCertificate] = useState<string>();
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');


    const handleCloseCertificate = () => setShowCertificate(false);
    const handleShowCertificate = () => { setShowCertificate(true) };

    const handleCloseCourse = () => setShowCourse(false);
    const handleShowCourse = (course: CourseEntity, skill: SkillEntity, levelId: number) => {
        setLevelId(levelId);
        setCourse(course);
        setSkill(skill);
        setShowCourse(true)
    };


    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const res = await axios.get(`/canspec/getListSpecsWithCan/${user?.id}`);
        const data = await res?.data.data.specials;
        setSpecialties(data);
        setSpecialtySelect(data[0]);
        getSpecialtyDetail(data[0].id)
    }

    async function getSpecialtyDetail(id: number) {
        const res = await axios.get(`/canspec/getASpecDetailByCandidateId?candidateId=${user?.id}&specialId=${id}`);
        const data = await res.data.data;
        setSpecialty(data.specialty);
    }


    const handleStartCourse = async () => {
        const request = {
            candidateId: user?.id,
            skillId: skill?.id,
            levelId: levelId,
            courseId: course?.id,
            certificate: ""
        }
        // startCourse(request);
        await axios.post('/status-candidate-course/create', request).then(function (res) {
            console.log(res.data.message)
            if (res.data.message == "SUCCESS") {
                setMessage("Started!");
                setMessageStatus("green");
                if (specialtySelect !== undefined) {
                    getSpecialtyDetail(specialtySelect?.id)
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
        await axios.put('/status-candidate-course/updateCertificate', request).then(function (res) {
            console.log(res.data.message)
            if (res.data.message == "SUCCESS") {
                setMessage("Submit successfuly!");
                setMessageStatus("green");
                if (specialtySelect !== undefined) {
                    getSpecialtyDetail(specialtySelect?.id)
                }
            }
        })
        handleCloseCertificate();
        handleCloseCourse();
    }

    const renderCourseDetail = () => {
        let status = "";
        let deadlineStr = "";

        const startAt = new Date(`${course?.startAt}`);
        const deadline = new Date(startAt.getTime() + 30 * 24 * 60 * 60 * 1000);
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
            default:
                status = Status.NotStarted;
                break;
        }

        if (now > deadline) {
            deadlineStr = "Expired";
        } else  {
            const diffTime = deadline.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
            deadlineStr = `${diffDays} day(s) left`;
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
                            {deadlineStr && course?.startAt.toString() !== "NOT YET" && <div className="col3">Deadline</div>}
                        </div>
                        <div className="course-row course-data">
                            <div className="col1 hover"><a href={course?.link}>{course?.link}</a></div>
                            <div className="col2" style={{ fontWeight: "bold", color: status }}>{course?.status}</div>
                            {deadlineStr && course?.startAt.toString() !== "NOT YET" && <div className="col3">{deadlineStr}</div>}
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
                return (
                    <Button variant="primary" onClick={() => {
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
            <h2>All Skills</h2>
            <div className="specialty-container">
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
                                specialties?.map((specialty) => {
                                    return (
                                        <div key={specialty.id}>
                                            <Dropdown.Item className='filter-item' onClick={() => {
                                                setSpecialtySelect(specialty);
                                                getSpecialtyDetail(specialty.id);
                                            }}>{specialty.name}</Dropdown.Item>
                                        </div>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <button className='btn-search ml-8'>Search</button>
                </div>
                {specialty && specialty?.skills.map((skill) => (
                    <div className="skill-container" key={skill.id}>
                        <span className="skill-name">{skill.name}</span>
                        <div className="courses">
                            {skill.levels.map((level) => (
                                level.courses.map((course) => (
                                    <div
                                        className="course"
                                        key={course.id}
                                        onClick={() => handleShowCourse(course, skill, level.id)}
                                    >
                                        <img src={skill.image} alt="" className="skill-icon" />
                                        <div className="course-description">
                                            <h3 className="course-name">{course.name}</h3>
                                            <span className="level">{level.name}</span>
                                        </div>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                ))}
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