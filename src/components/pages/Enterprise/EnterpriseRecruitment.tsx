import { faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import "./EnterpriseRecruitment.css";

const EnterpriseRecruitment = () => {
    return (
        <div id='EnterpriseRecruitment'>
            <div className="filter">
                <div className="form-input">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <Dropdown className="specialty-dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='specialty'>
                        <span>All Specialty</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='specialty-menu'>
                        <div>
                            <Dropdown.Item className='specialty-item'>Developer</Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <button className='btn-search'>Tìm</button>
            </div>
            <div className="post-container">
                <div className="container-header">
                    <div className='quantity'><strong>871</strong> Post</div>
                    <Dropdown className="specialty-dropdown" style={{width: "18%"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='specialty duration'>
                            <span>All Durations</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='specialty-menu'>
                            <div>
                                <Dropdown.Item className='specialty-item'>All durations</Dropdown.Item>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default EnterpriseRecruitment