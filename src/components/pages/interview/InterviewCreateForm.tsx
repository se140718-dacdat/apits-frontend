import { Dropdown } from "react-bootstrap";
import "./InterviewCreateForm.css"
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3, faArrowRight, faCirclePlus, faClipboardCheck, faClose, faCode, faDatabase, faDisplay, faDove, faFilter, faHeartCirclePlus, faLightbulb, faMagnifyingGlass, faPlus, faPlusCircle, faPlusMinus, faShare, faTerminal, faUsersLine, faXmark } from "@fortawesome/free-solid-svg-icons";

const InterviewCreate = () => {
    const listCandidate = ['Tran Van A', 'Tran Van B', 'Tran Van C', 'Tran Van D', 'Tran Van E', 'Tran Van F', 'Tran Van G', 'Tran Van H'];
    const [listCandidateSelected, setListCandidateSelected] = useState(Array<string>);
    const [candidatesSelected, setCandidatesSelected] = useState(Array<string>);
    const [titleInterview, setTitleInterview] = useState('');
    const [interviewType, setInterviewType] = useState('Interview with Enterprise');
    const [duration, setDuration] = useState('1h');
    const [specialtyFilter, setSpecialtyFilter] = useState('Specialty');
    const [levelFilter, setLevelFilter] = useState('Level');
    const [isPopupFilter, setIsPopupFilter] = useState(false);
    const [professor, setProfessor] = useState('Tran Van Tam');
    const [enterprise, setEnterprise] = useState('Tran Van tam');
    const [isPopupInterviewer, setIsPopupInterviewer] = useState(false);



    const handleFilterClick = () => {
        if (isPopupFilter === true)
            setIsPopupFilter(false)
    }

    const handleItemCandidateClick = (name: string) => {
        setCandidatesSelected(candidatesSelected.filter(i => i !== name));
        setListCandidateSelected(listCandidateSelected.filter(i => i !== name));
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
                                <select className="form-select" onChange={e => setInterviewType(e.target.value)}>
                                    <option>Interview with Enterprise</option>
                                    <option>Meeting with Professor</option>
                                </select>
                            </div>
                        </div>
                        <div className="group-input">
                            <label className="gr-left">Expected start time:</label>
                            <div className="gr-right">
                                <input type="datetime-local" className="input input-border input-date" />
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
                                <input type="text" className="input input-border" placeholder="Link interview" required />
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
                                                        enterprise !== ''
                                                            ? (
                                                                <div className="participant__name btn-item" onClick={() => setEnterprise('')}>
                                                                    <span>{enterprise}</span>
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
                                                        professor !== ''
                                                            ? (
                                                                <div className="participant__name btn-item" onClick={() => setProfessor('')}>
                                                                    <span>{professor}</span>
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
                                    {
                                        interviewType === 'Interview with Enterprise'
                                            ? (
                                                <></>
                                            )
                                            : (
                                                <>
                                                    <div className="filter">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                {specialtyFilter}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item id="Data Engineer" onClick={e => setSpecialtyFilter('Data Engineer')}>
                                                                    {
                                                                        <div className="specialty-item">
                                                                            <div className="left-icon"><FontAwesomeIcon icon={faDatabase} /></div>
                                                                            <div className="right-content">
                                                                                <label className="specialty-title">Data Engineer</label>
                                                                                <label className="specialty-description">Python, SQL, Amazon Web Services (AWS), Microsoft Azure</label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Dropdown.Item>
                                                                <Dropdown.Item id="Tester" onClick={e => setSpecialtyFilter('Tester')}>
                                                                    {
                                                                        <div className="specialty-item">
                                                                            <div className="left-icon"><FontAwesomeIcon icon={faClipboardCheck} /></div>
                                                                            <div className="right-content">
                                                                                <label className="specialty-title">Tester</label>
                                                                                <label className="specialty-description">Agile/Scrum, Testing web/mobile, Java, Python, etc.</label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Dropdown.Item>
                                                                <Dropdown.Item id="Business Analyst" onClick={e => setSpecialtyFilter('Business Analyst')}>
                                                                    {
                                                                        <div className="specialty-item">
                                                                            <div className="left-icon"><FontAwesomeIcon icon={faUsersLine} /></div>
                                                                            <div className="right-content">
                                                                                <label className="specialty-title">Business Analyst</label>
                                                                                <label className="specialty-description">AWS, Microsoft Azure, GCP, reporting tools, etc.</label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Dropdown.Item>
                                                                <Dropdown.Item id="Developer" onClick={e => setSpecialtyFilter('Developer')}>
                                                                    {
                                                                        <div className="specialty-item">
                                                                            <div className="left-icon"><FontAwesomeIcon icon={faDisplay} /></div>
                                                                            <div className="right-content">
                                                                                <label className="specialty-title">Developer</label>
                                                                                <label className="specialty-description">Front-end, Back-end, Full-stack, etc.</label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Dropdown.Item>
                                                                <Dropdown.Item id="Junior Developer" onClick={e => setSpecialtyFilter('Junior Developer')}>
                                                                    {
                                                                        <div className="specialty-item">
                                                                            <div className="left-icon"><FontAwesomeIcon icon={faCode} /></div>
                                                                            <div className="right-content">
                                                                                <label className="specialty-title">Junior Developer</label>
                                                                                <label className="specialty-description">2-3 years of professional experience </label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Dropdown.Item>
                                                                <Dropdown.Item id="Senior Developer" onClick={e => setSpecialtyFilter('Senior Developer')}>
                                                                    {
                                                                        <div className="specialty-item">
                                                                            <div className="left-icon"><FontAwesomeIcon icon={faTerminal} /></div>
                                                                            <div className="right-content">
                                                                                <label className="specialty-title">Senior Developer</label>
                                                                                <label className="specialty-description">5-10 years of professional experience</label>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="filter">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                {levelFilter}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => { setLevelFilter('Beginer') }}>
                                                                    <div className="specialty-item">
                                                                        <div className="left-icon"><FontAwesomeIcon icon={fa1} /></div>
                                                                        <div className="right-content">
                                                                            <label className="specialty-title">Beginer</label>
                                                                            <label className="specialty-description">who is just starting to learn something new</label>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setLevelFilter('Advanced') }}>
                                                                    <div className="specialty-item">
                                                                        <div className="left-icon"><FontAwesomeIcon icon={fa2} /></div>
                                                                        <div className="right-content">
                                                                            <label className="specialty-title">Advanced</label>
                                                                            <label className="specialty-description">who has already mastered the fundamentals</label>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setLevelFilter('Intensive') }}>
                                                                    <div className="specialty-item">
                                                                        <div className="left-icon"><FontAwesomeIcon icon={fa3} /></div>
                                                                        <div className="right-content">
                                                                            <label className="specialty-title">Intensive</label>
                                                                            <label className="specialty-description">deep level of expertise</label>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </>
                                            )
                                    }

                                    <button className="btn-filter" onClick={() => setIsPopupFilter(true)}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                            <div className="items-filter">
                                {
                                    candidatesSelected
                                        ? (
                                            <div className="cadidate-filter">
                                                <label className="cadidate-list-title">List Candidate</label>
                                                <div className="cadidate-list">
                                                    {
                                                        candidatesSelected.map((name: string, key: number) =>
                                                            <button key={key} className="btn-item" onClick={() => handleItemCandidateClick(name)}>
                                                                <span>{name}</span>
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                        : <></>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="group-button">
                    <button className="btn btn-cancel">Cancel</button>
                    <button className="btn" type="submit">Finish</button>
                </div>
            </div>
            {
                isPopupInterviewer
                    ? (
                        <div id="PopupInterviewer">
                            <div className="layer" onClick={() => setIsPopupInterviewer(false)}></div>
                            <div className="interviewer-container">
                                <div className="header">
                                    <label className="filter-title">Search Enterprise</label>
                                    <FontAwesomeIcon className="filter-close" onClick={() => setIsPopupInterviewer(false)} icon={faXmark}></FontAwesomeIcon>
                                </div>
                                <div className="interviewer-search input-pos">
                                    <input type="text" className="input-search input input-border" placeholder="Enter Enterprise name" />
                                    <div className="search-name">
                                        {
                                            listCandidate.map((name, key) =>
                                                <div className="search-name-interviewer"
                                                    onClick={() => {
                                                        if (interviewType === 'Interview with Enterprise')
                                                            setEnterprise(name);
                                                        else
                                                            setProfessor(name);
                                                        setIsPopupInterviewer(false);
                                                    }}>
                                                    <span>{name}</span>
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
                        <div className="filter-container">
                            <div className="header">
                                <label className="filter-title">Choices Candidate</label>
                                <FontAwesomeIcon className="filter-close" onClick={handleFilterClick} icon={faXmark}></FontAwesomeIcon>
                            </div>
                            <div className="filter-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className="tb-id">ID</th>
                                            <th>Name</th>
                                            <th className="tb-check">Select</th>
                                        </tr>

                                        {listCandidate.map((candidateName, index) => {
                                            return (
                                                <tr key={index} className="candidate-row">
                                                    <td className="tb-id">{index + 1}</td>
                                                    <td><span>{candidateName}</span></td>
                                                    <td className="tb-check">
                                                        <input type="checkbox" className="candidate-checkbox"
                                                            checked={listCandidateSelected.includes(candidateName)}
                                                            name={candidateName}
                                                            id={candidateName}
                                                            onChange={(e) => {
                                                                if (listCandidateSelected.includes(e.target.name))
                                                                    setListCandidateSelected(listCandidateSelected.filter(i => i !== candidateName))
                                                                else
                                                                    setListCandidateSelected(listCandidateSelected.concat(e.target.name))
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                            </div>
                            <div className="group-button">
                                <button className="btn btn-cancel" onClick={handleFilterClick}>Cancel</button>
                                <button className="btn" type="submit"
                                    onClick={() => {
                                        setCandidatesSelected(listCandidateSelected)
                                        handleFilterClick()
                                    }}
                                >Accept</button>
                            </div>
                        </div>
                    </div>)
                    : (<></>)
            }

        </div>
    );
}

export default InterviewCreate;
