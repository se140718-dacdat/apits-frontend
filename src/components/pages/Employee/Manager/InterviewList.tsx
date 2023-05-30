import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InterviewTable from '../../../modules/pagecomponents/common/Interview';
import "./InterviewList.css";

const interviewType = [
    "CHECK",
    "TEST"
]

const interviewStatus = [
    "WAITING",
    "CREATED"
]

const InterviewList = () => {
    const navigate = useNavigate();
    const [type, setType] = useState<string>(interviewType[0])
    const [status, setStatus] = useState<string>(interviewStatus[0])
    const [id, setId] = useState<number>(0);

    return (
        <div id='InterviewList'>
            <h2>Evaluation</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <Dropdown className="filter-dropdown ml-8">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>{type}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        {
                            interviewType.map((type, index) => {
                                return (
                                    <Dropdown.Item className='filter-item' onClick={()=>{setType(type)}} key={index}>{type}</Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="filter-dropdown ml-8">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>{status}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        {
                            interviewStatus.map((status, index) => {
                                return (
                                    <Dropdown.Item className='filter-item' onClick={()=>{setStatus(status)}} key={index}>{status}</Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <button className='btn-search ml-8'>Search</button>
            </div>
            <InterviewTable type={type} status={status} />
        </div>
    )
}

export default InterviewList