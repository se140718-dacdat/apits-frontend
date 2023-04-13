import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import "../../modules/pagecomponents/common/Notification.css";
import NotificationTable from './CandidateNotification';

interface Props {
    roleName: string;
}


const notifications = [
    {
        id: "1",
        title: "You have been assigned to the PHP Developer (Magento)",
        date: "15/03/2023",
        time: "15:00-16:00",
        WorkForm: "Fulltime",
        Salary: "$70 - $90/hr",
        Company: "HTCSOFT VIỆT NAM",
        type: 1,
    }
];

const NotificationList: FC<Props> = (props) => {

    return (
        <div id='Notification'>
            <h2>Notification</h2>
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
                <NotificationTable notification={notifications} />
            </div>
        </div>
    )
}

export default NotificationList