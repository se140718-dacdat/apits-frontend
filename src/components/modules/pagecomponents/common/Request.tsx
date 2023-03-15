import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import "./Request.css";
import "./Filter.css";
import InterviewTable from './Interview';

const interviews = [
  {
     id: "1",
     title: "Interview for Recruitment ABC",
     date: "15/03/2023",
     time: "15:00-16:00",
     duration: "60 minutes",
     participant: "Lương Hồ Đắc Đạt",
     link: "https://meet.google.com/nth-fvqt-xfd?pli=1&fbclid=IwAR3BnBYI_DWasftRsE52uNvwA4CzlG7CMGMoyvYBh2zIjWppJVhT6b2UXnk"
  },
];

const Request = () => {
  return (
    <div id='Request'>
      <h2>Request list</h2>
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
      <InterviewTable interviews={interviews}/>
    </div>
  )
}

export default Request