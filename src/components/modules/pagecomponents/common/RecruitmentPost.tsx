import { faBusinessTime, faClock, faCoins, faLocation, faLocationDot, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./RecruitmentPost.css";

const RecruitmentPost = () => {
    const navigate = useNavigate();

    return (
        <div id='RecruitmentPost'>
            <h2 className='primary-color'>Jobs</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <Dropdown className="filter-dropdown ml-8">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>All Specialty</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        <div>
                            <Dropdown.Item className='filter-item'>Developer</Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="filter-dropdown ml-8" style={{ width: "18%" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>All Durations</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        <div>
                            <Dropdown.Item className='filter-item'>All durations</Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <button className='btn-search ml-8'>Tìm</button>
            </div>
            <div className="post-container">
                <div className="container-header">
                    <div className='quantity'><strong>871</strong> Post</div>

                </div>
                <div className="post-list">
                    <div className="post" onClick={()=>{navigate("/post-detail")}}>
                        <div className="avt-post-cover inline-block">
                            <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                        </div>
                        <div className="post-detail inline-block">
                            <div className="post-name">PHP Developer (Magento)</div>
                            <div className="post-company-name">CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HTCSOFT VIỆT NAM</div>
                        </div>
                        <div className="skills">
                            <div className="skill">
                                SQL
                            </div>
                            <div className="skill">
                                Java
                            </div>
                            <div className="skill">
                                Python
                            </div>
                        </div>
                        <div className="post-description">
                            <div className="description-item">
                                <FontAwesomeIcon icon={faCoins} className="icon primary-color mr-8" />
                                $70 - $90/hr
                            </div>
                            <div className="description-item">
                                <FontAwesomeIcon icon={faBusinessTime} className="icon primary-color mr-8" />
                                Fulltime
                            </div>
                            <div className="description-item">
                                <FontAwesomeIcon icon={faClock} className="icon primary-color mr-8" />
                                17 days left to apply
                            </div>
                            <div className="description-item">
                                <FontAwesomeIcon icon={faLocationDot} className="icon primary-color mr-8" />
                                Đường D1, Đ. D1, Phường Tân Phú, Quận 9, Thành phố Hồ Chí Minh 715650
                            </div>
                        </div>
                    </div>
                    <div className="post" onClick={()=>{navigate("/post-detail")}}>
                        <div className="avt-post-cover inline-block">
                            <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                        </div>
                        <div className="post-detail inline-block">
                            <div className="post-name">Backend Developer (Java)</div>
                            <div className="post-company-name">FPT Software HCM</div>
                        </div>
                        <div className="skills">
                            <div className="skill">
                                OOP
                            </div>
                            <div className="skill">
                                Java
                            </div>
                            <div className="skill">
                                Spring boot
                            </div>
                        </div>
                        <div className="post-description">
                            <div className="description-item">
                                <FontAwesomeIcon icon={faCoins} className="icon primary-color mr-8" />
                                $70 - $90/hr
                            </div>
                            <div className="description-item">
                                <FontAwesomeIcon icon={faBusinessTime} className="icon primary-color mr-8" />
                                Fulltime
                            </div>
                            <div className="description-item">
                                <FontAwesomeIcon icon={faClock} className="icon primary-color mr-8" />
                                17 days left to apply
                            </div>
                            <div className="description-item">
                                <FontAwesomeIcon icon={faLocationDot} className="icon primary-color mr-8" />
                                Đường D1, Đ. D1, Phường Tân Phú, Quận 9, Thành phố Hồ Chí Minh 715650
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RecruitmentPost