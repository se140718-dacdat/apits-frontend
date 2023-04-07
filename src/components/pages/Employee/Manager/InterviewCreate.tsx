import { Dropdown } from "react-bootstrap";
import "./InterviewCreate.css"
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3, faArrowRight, faCirclePlus, faClipboardCheck, faClose, faCode, faDatabase, faDisplay, faDove, faFilter, faHeartCirclePlus, faLightbulb, faMagnifyingGlass, faPlus, faPlusCircle, faPlusMinus, faShare, faTerminal, faUsersLine, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ApprovedEntity, AssignResponse, CandidateConfirmed, CandidateCourseProcessing, CreatorEntity, EmployeeEntity, NewUser, NewUserInterview, Professor } from "../../../../entity";
import { createInterviewAssign, createInterviewProfessor, getAllAssignApproved, getAllEmployees, getAllNewCandidate, getCandidateCourseProcessing } from "../../../../redux/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const InterviewCreate = () => {
    const { id } = useParams();
    const user = useSelector((state: any) => state.user.user.user);
    const navigate = useNavigate();

    const [date, setDate] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [candidatesSelected1, setCandidatesSelected1] = useState<CandidateConfirmed>();
    const [candidatesSelected2, setCandidatesSelected2] = useState<NewUser>();
    const [candidatesSelected3, setCandidatesSelected3] = useState<CandidateCourseProcessing>();
    const [titleInterview, setTitleInterview] = useState('');
    const [interviewType, setInterviewType] = useState('Interview with Enterprise');
    const [duration, setDuration] = useState('1h');
    const [specialtyFilter, setSpecialtyFilter] = useState('Specialty');
    const [levelFilter, setLevelFilter] = useState('Level');
    const [isPopupFilter, setIsPopupFilter] = useState(false);
    const [professor, setProfessor] = useState<Professor>();
    const [enterprise, setEnterprise] = useState<CreatorEntity>();
    const [isPopupInterviewer, setIsPopupInterviewer] = useState(false);
    const [assigns, setAssigns] = useState<ApprovedEntity[]>([]);
    const [newUsers, setNewUsers] = useState<NewUserInterview[]>([]);
    const [candidates, setCandidates] = useState<CandidateCourseProcessing[]>([]);
    const [employees, setEmployees] = useState<Professor[]>([]);
    const [participantA, setParticipantA] = useState<[]>([]);
    const [participantB, setParticipantB] = useState<[]>([]);

    const types = [
        "Interview with Enterprise",
        "Test Specialty with Professor",
        "Check Course with Professor"
    ]


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setAssigns(await getAllAssignApproved());
        setNewUsers(await getAllNewCandidate());
        setCandidates(await getCandidateCourseProcessing());
        setEmployees(await getAllEmployees());
    }

    const handleFilterClick = () => {
        if (isPopupFilter === true)
            setIsPopupFilter(false)
    }

    const handleItemCandidateClick = () => {
        setCandidatesSelected1(undefined);
        setCandidatesSelected2(undefined);
        setCandidatesSelected3(undefined);
    }

    const handleSelect = (type: string) => {
        setInterviewType(type);
    }

    const handleCreateInterview = () => {
        let request = (interviewType === types[0]) ?
            {
                purpose: titleInterview,
                date: date,
                time: duration,
                linkMeeting: link,
                type: "Interview with Enterprise",
                round: "",
                description: "",
                status: "CREATED",
                duration: duration,
                address: "",
                candidateConfirm: "",
                managerId: user?.id,
                candidateId: candidatesSelected1?.id,
                assignId: id,
                enterpriseId: enterprise?.id
            }
            :
            {
                purpose: titleInterview,
                date: date,
                time: duration,
                linkMeeting: link,
                type: "Interview with Enterprise",
                round: "",
                description: "",
                status: "CREATED",
                duration: duration,
                address: "",
                candidateConfirm: "",
                managerId: user?.id,
                candidateId: candidatesSelected1?.id,
                assignId: id,
                professorId: professor?.id
            };
        console.log(request);
            (interviewType === types[0]) ?
            createInterviewAssign(request)
            :
            createInterviewProfessor(request);
    }


    return (
        <div id="InterviewCreate">
            <div className="bg">
                <div className="header">
                    <h4>Interview schedule</h4>
                    <span>
                        Maximize your hiring efficiency by implementing<br /> an interview schedule that outlines the key details
                    </span>
                </div>
            </div>
            <div className="container">
                <div className="form-group">
                    <h2 className="header">
                        {
                            interviewType === 'Interview with Enterprise'
                                ? 'Interview form sections'
                                : 'Meeting form section'
                        }
                    </h2>
                    <h4 className="tilte">Detailed information</h4>
                    <div className="underline"></div>
                    <div className="content">
                        <div className="group-input">
                            <label className="gr-left">Title:</label>
                            <div className="gr-right">
                                <input type="text"
                                    className="input input-border"
                                    placeholder="Title" value={titleInterview}
                                    onChange={e => setTitleInterview(e.target.value)} required
                                />
                            </div>
                        </div>
                        <div className="error">
                            <div className="text-err">This is the error message liner  </div>
                        </div>
                        <div className="group-input">
                            <label className="gr-left">Type interview:</label>
                            <div className="gr-right form-input-select">
                                <select className="form-select" onChange={e => handleSelect(e.target.value)}>
                                    {
                                        types.map((type) => {
                                            return (
                                                <option>{type}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="group-input">
                            <label className="gr-left">Expected start time:</label>
                            <div className="gr-right">
                                <input type="datetime-local" className="input input-border input-date" onChange={(e) => { setDate(`${e.target.value}`) }} />
                            </div>
                        </div>
                        <div className="group-input">
                            <label className="gr-left">Expected duration:</label>
                            <div className="gr-right form-input-select">
                                <select className="form-select select-duration" onChange={e => setDuration(e.target.value)}>
                                    <option>1h</option>
                                    <option>1h30</option>
                                    <option>2h</option>
                                    <option>2h30</option>
                                    <option>3h</option>
                                </select>
                            </div>
                        </div>
                        <div className="group-input">
                            <label className="gr-left">Link:</label>
                            <div className="gr-right">
                                <input type="text" className="input input-border" placeholder="Link interview" required onChange={e => setLink(e.target.value)} />
                                <span className="text-err"></span>
                            </div>
                        </div>
                        <h4 className="tilte">Participants</h4>
                        <div className="underline"></div>
                        <div className="group-participants">
                            {
                                interviewType === 'Interview with Enterprise'
                                    ? (
                                        <div className="participant">
                                            <label className="gr-left">Enterprise:</label>
                                            <div className="gr-right participant__input ">
                                                <div className=" participant__father">
                                                    {
                                                        enterprise !== undefined
                                                            ? (
                                                                <div className="participant__name btn-item" onClick={() => setEnterprise(undefined)}>
                                                                    <span>{enterprise.name}</span>
                                                                    <FontAwesomeIcon icon={faClose} />
                                                                </div>
                                                            )
                                                            : (
                                                                <FontAwesomeIcon
                                                                    className="participant__icon--plus"
                                                                    icon={faPlusCircle}
                                                                    onClick={() => setIsPopupInterviewer(true)}
                                                                />
                                                            )
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div className="participant">
                                            <label className="gr-left">Professor:</label>
                                            <div className="gr-right participant__input ">
                                                <div className=" participant__father">
                                                    {
                                                        professor !== undefined
                                                            ? (
                                                                <div className="participant__name btn-item" onClick={() => setProfessor(undefined)}>
                                                                    <span>{professor.name}</span>
                                                                    <FontAwesomeIcon icon={faClose} />
                                                                </div>
                                                            )
                                                            : (
                                                                <FontAwesomeIcon
                                                                    className="participant__icon--plus"
                                                                    icon={faPlusCircle}
                                                                    onClick={() => setIsPopupInterviewer(true)}
                                                                />
                                                            )
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    )
                            }


                            <div className="participant">
                                <label className="gr-left">Candidates:</label>
                                <div className="gr-right participant-filter">
                                    <button className="btn-filter-interview" onClick={() => setIsPopupFilter(true)}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                            <div className="items-filter-interview">
                                {
                                    (interviewType === types[0]) ?
                                        (
                                            <div className="cadidate-filter-interview">
                                                <label className="cadidate-list-title">List Candidate</label>
                                                <div className="cadidate-list">
                                                    <button className="btn-item" onClick={() => handleItemCandidateClick()}>
                                                        <span>{candidatesSelected1?.name}</span>
                                                        <FontAwesomeIcon icon={faClose} />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                        : (interviewType === types[1]) ?
                                            (
                                                <div className="cadidate-filter-interview">
                                                    <label className="cadidate-list-title">List Candidate</label>
                                                    <div className="cadidate-list">
                                                        <button className="btn-item" onClick={() => handleItemCandidateClick()}>
                                                            <span>{candidatesSelected2?.name}</span>
                                                            <FontAwesomeIcon icon={faClose} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="cadidate-filter-interview">
                                                    <label className="cadidate-list-title">List Candidate</label>
                                                    <div className="cadidate-list">
                                                        <button className="btn-item" onClick={() => handleItemCandidateClick()}>
                                                            <span>{candidatesSelected3?.candidate.name} --- {candidatesSelected3?.course.name}</span>
                                                            <FontAwesomeIcon icon={faClose} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="group-button">
                    <button className="btn btn-cancel"><a href="interview"  onClick={() => { navigate("/") }}>Cancel</a></button>
                    <button className="btn" type="submit" onClick={() => { handleCreateInterview() }}>Finish</button>
                </div>
            </div>
            {
                isPopupInterviewer
                    ? (
                        <div id="PopupInterviewer">
                            <div className="layer" onClick={() => setIsPopupInterviewer(false)}></div>
                            <div className="interviewer-container">
                                <div className="header">
                                    <label className="filter-interview-title">Search {(interviewType === 'Interview with Enterprise') ? "Enterprise" : "Professor"}</label>
                                    <FontAwesomeIcon className="filter-interview-close" onClick={() => setIsPopupInterviewer(false)} icon={faXmark}></FontAwesomeIcon>
                                </div>
                                <div className="interviewer-search input-pos">
                                    <input type="text" className="input-search input input-border" placeholder={`Enter ${(interviewType === 'Interview with Enterprise') ? "Enterprise" : "Professor"} name`} />
                                    <div className="search-name">
                                        {
                                            (interviewType === types[0]) ?
                                                assigns.map((assign, key) =>
                                                    <div className="search-name-interviewer" key={key}
                                                        onClick={() => {
                                                            setEnterprise(assign.recruitmentRequest.creator);
                                                            setIsPopupInterviewer(false);
                                                        }}>
                                                        <span>{assign.recruitmentRequest.creator.name}</span>
                                                        <FontAwesomeIcon icon={faArrowRight} className="search-icon" />
                                                    </div>
                                                )
                                                :
                                                employees.map((employee, key) =>
                                                    <div className="search-name-interviewer" key={key}
                                                        onClick={() => {
                                                            setProfessor(employee);
                                                            setIsPopupInterviewer(false);
                                                        }}>
                                                        <span>{employee.name}</span>
                                                        <FontAwesomeIcon icon={faArrowRight} className="search-icon" />
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                                </div>
                            </div>
                        </div>
                    )
                    : <></>
            }
            {
                isPopupFilter
                    ? (<div id="PopupFilter">
                        <div className="layer" onClick={handleFilterClick}></div>
                        <div className="filter-interview-container">
                            <div className="header">
                                <label className="filter-interview-title">Choices Candidate</label>
                                <FontAwesomeIcon className="filter-interview-close" onClick={handleFilterClick} icon={faXmark}></FontAwesomeIcon>
                            </div>
                            <div className="filter-interview-body">
                                {
                                    (interviewType === types[0]) ?
                                        assigns.map((assign, index) => {
                                            return (
                                                <div key={index} className="inline-block-cover">
                                                    <div>
                                                        {assign.candidateResponse.name}
                                                    </div>
                                                    <FontAwesomeIcon icon={faPlusCircle} onClick={() => {
                                                        setIsPopupFilter(false);
                                                        setCandidatesSelected1(assign.candidateResponse);
                                                    }} />
                                                </div>
                                            )
                                        })
                                        : (interviewType === types[1]) ?
                                            newUsers.map((item, index) => {
                                                return (
                                                    <div key={index} className="inline-block-cover">
                                                        <div>
                                                            {item.candidate.name}
                                                        </div>
                                                        <FontAwesomeIcon icon={faPlusCircle} onClick={() => {
                                                            setIsPopupFilter(false);
                                                            setCandidatesSelected2(item.candidate)
                                                        }} />
                                                    </div>
                                                )
                                            })
                                            :
                                            candidates.map((candidate, index) => {
                                                return (
                                                    <div key={index} className="inline-block-cover">
                                                        <div>
                                                            {candidate.candidate.name} --- {candidate.course.name}
                                                        </div>
                                                        <FontAwesomeIcon icon={faPlusCircle} onClick={() => {
                                                            setIsPopupFilter(false);
                                                            setCandidatesSelected3(candidate)
                                                        }} />
                                                    </div>
                                                )
                                            })

                                }

                            </div>
                        </div>
                    </div>)
                    : (<></>)
            }

        </div>
    );
}

export default InterviewCreate;
