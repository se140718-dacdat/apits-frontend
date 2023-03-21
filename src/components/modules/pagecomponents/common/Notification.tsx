import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react'
import { Dropdown } from 'react-bootstrap';
import { Interview } from '../../../../model';
import InterviewTable from './Interview';
import "./Notification.css";

interface Props {
    roleName: string;
}


const interviews: Interview[] = [
    {
       id: "1",
       title: "Interview for Recruitment ABC",
       date: "15/03/2023",
       time: "15:00-16:00",
       duration: "60 minutes",
       participant: "Lương Hồ Đắc Đạt",
       host: "Company ABC",
       link: "https://meet.google.com/nth-fvqt-xfd?pli=1&fbclid=IwAR3BnBYI_DWasftRsE52uNvwA4CzlG7CMGMoyvYBh2zIjWppJVhT6b2UXnk",
       type: 1,
    },
    {
      id: "2",
      title: "Interview for recruitment Fsoft",
      date: "11/04/2023",
      time: "15:00-16:00",
      duration: "60 minutes",
      host: "FPT Software",
      link: "link.com",
      participant: "Dac Dat",
      type: 1
    }
  ];

const Notification: FC<Props> = (props) => {
console.log(props.roleName)

    return (
        <div id='Notification'>
            <h2>Notification</h2>
            {
                (props.roleName == "CANDIDATE") ?
                    (
                        (
                            <div className="notification-container">
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
                            </div>
                        )
                    )
                    :
                    (props.roleName == "ENTERPRISE") ?
                        (
                            (
                                <div className="notifcation-container"></div>
                            )
                        )
                        :
                        (
                            (
                                <div className="notifcation-container"></div>
                            )
                        )
            }
        </div>
    )
}

export default Notification