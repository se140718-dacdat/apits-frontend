import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import InterviewTable from '../../../modules/pagecomponents/common/Interview';
import "./InterviewList.css";

const interviews = [
    {
        id: "1",
        title: "Interview for Recruitment ABC",
        date: "15/03/2023",
        time: "15:00-16:00",
        duration: "60 minutes",
        host: "FPT Fsoftware",
        participant: "Lương Hồ Đắc Đạt",
        link: "https://meet.google.com/nth-fvqt-xfd?pli=1&fbclid=IwAR3BnBYI_DWasftRsE52uNvwA4CzlG7CMGMoyvYBh2zIjWppJVhT6b2UXnk",
        type: 2
    },
];

const InterviewList = () => {
    const navigate = useNavigate();

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100% !important",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: "100vh !important",
    };
    return (
        <div id='InterviewList'>
            <h2>Interview List</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <Dropdown className="filter-dropdown ml-8">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>Filter 1</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        <Dropdown.Item className='filter-item'>Interview</Dropdown.Item>
                        <Dropdown.Item className='filter-item'>Option 2</Dropdown.Item>
                        <Dropdown.Item className='filter-item'>Option 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <button className='btn-search ml-8'>Search</button>
            </div>
            <InterviewTable interviews={interviews} />
            <a className='btn' href='create-interview' >Create Interview</a>
        </div>
    )
}

export default InterviewList