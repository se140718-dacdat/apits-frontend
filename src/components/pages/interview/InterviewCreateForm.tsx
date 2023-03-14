import { Dropdown } from "react-bootstrap";
import "./InterviewCreateForm.css"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFilter, faShare, faXmark } from "@fortawesome/free-solid-svg-icons";

const InterviewCreate = () => {
    const specialtyList = ['Data Engineer', 'Tester', 'Business Analyst', 'Developer', 'Junior Developer', 'Senior Developer'];
    const level = ['Beginner', 'Advanced', 'Intensive'];
    const [listCandidateSelected, setListCandidateSelected] = useState(Array<string>);

    const [interviewType, setInterviewType] = useState('Interview with Enterprise');
    const [duration, setDuration] = useState('1h');
    const [specialtyFilter, setSpecialtyFilter] = useState('Specialty');
    const [levelFilter, setLevelFilter] = useState('Level');
    const [isPopupFilter, setIsPopupFilter] = useState(false);

    const handleFilterClick = () => {
        if (isPopupFilter == true)
            setIsPopupFilter(false)
    }

    const handleItemCandidateClick = (name: string) => {
        setListCandidateSelected(listCandidateSelected.filter(i => i !== name))
    }

    const handleAcceptCandidate = (names: Array<string>) => {
        setListCandidateSelected(['tran van tam', 'nguyen duc hoang']);
        handleFilterClick();
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
                                <input type="text" className="input regis-input" placeholder="Title" required />
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
                                <input type="datetime-local" className="input regis-input input-date" />
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
                                <input type="text" className="input regis-input" placeholder="Link interview" required />
                                <span className="text-err"></span>
                            </div>
                        </div>
                        <h4 className="tilte">Participants</h4>
                        <div className="underline"></div>
                        <div className="group-participants">
                            <div className="participant">
                                <label className="gr-left">Enterprise</label>
                                <div className="gr-right">Cty TNHH ABC</div>
                            </div>
                            <div className="participant">
                                <label className="gr-left">Candidates</label>
                                <div className="gr-right participant-filter">
                                    <div className="filter">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {specialtyFilter}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    specialtyList.map((pecialty) => {
                                                        return (
                                                            <div>
                                                                <Dropdown.Item onClick={() => { setSpecialtyFilter(pecialty) }}>{pecialty}</Dropdown.Item>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="filter">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {levelFilter}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    level.map((lv) => {
                                                        return (
                                                            <div>
                                                                <Dropdown.Item onClick={() => { setLevelFilter(lv) }}>{lv}</Dropdown.Item>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <button className="btn-filter" onClick={() => setIsPopupFilter(true)}><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon></button>
                                </div>
                            </div>
                            <div className="items-filter">
                                <div className="cadidate-filter">
                                    {
                                        listCandidateSelected.map((name: string, key: number) =>
                                            <button key={key} className="btn-item" onClick={() => handleItemCandidateClick(name)}>
                                                <span>{name}</span>
                                                <FontAwesomeIcon icon={faClose} />
                                            </button>
                                        )
                                    }
                                </div>
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
                isPopupFilter
                    ? (<div id="PopupFilter">
                        <div className="layer" onClick={handleFilterClick}></div>
                        <div className="filter-container">
                            <div className="header">
                                <label className="filter-title">Choices Candidate</label>
                                <FontAwesomeIcon className="filter-close" onClick={handleFilterClick} icon={faXmark}></FontAwesomeIcon>
                            </div>
                            <div className="filter-body">
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>
                                <div className="candidate">
                                    <span>Tran Van Tam</span>
                                    <input type="checkbox" className="candidate-checkbox" />
                                </div>

                            </div>
                            <div className="group-button">
                                <button className="btn btn-cancel" onClick={handleFilterClick}>Cancel</button>
                                <button className="btn" type="submit" onClick={() => handleAcceptCandidate([])}>Accept</button>
                            </div>
                        </div>
                    </div>)
                    : (<></>)
            }

        </div>
    );
}

export default InterviewCreate;
