import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import InterviewTable from '../../../modules/pagecomponents/common/Interview';
import "./InterviewList.css";
import { useState } from 'react';

const interviewType = [
    "Check",
    "Enterprise",
    "Test"
]


const InterviewList = () => {
    const navigate = useNavigate();
    const [type, setType] = useState<string>(interviewType[0])
    const [id, setId] = useState<number>(0);

    return (
        <div id='InterviewList'>
            <h2>Interviews</h2>
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
                <button className='btn-search ml-8'>Search</button>
            </div>
            <InterviewTable type={type} id={id} />
            <a className='btn' href='create-interview' >Create Interview</a>
        </div>
    )
}

export default InterviewList