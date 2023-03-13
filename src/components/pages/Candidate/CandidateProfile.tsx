import React, { FC, useState } from 'react'
import "./CandidateProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faPhone, faCakeCandles, faHouse, faVenusMars, faUser, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import { Category, dataEngineer, developer, Level, level1, level2, level3} from '../../../model';
import { useSelector } from 'react-redux';

export const CandidateProfile: FC = () => {
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const user = useSelector((state: any) => state.user.user.user);
    const date = account.createAt.slice(0, 10)

    const [show, setShow] = useState(false);
    const [category, setCategory] = useState<Category>(developer);
    const categoryList: Category[] = [developer, dataEngineer]
    const levelList: Level[] = [level1, level2, level3]

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSelect = (e: Category) => {
        setCategory(e);
    }

    return (
        <div id='CandidateProfile' className='clearfix'>
            <img src="images/banner.jpg" className='banner' alt="" />
            <div className="profile-container">
                <div className="left">
                    <div className="profile">
                        <div className="col-left">
                            <img src="images/avt.jpg" className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                {date}
                            </div>
                        </div>
                        <div className="col-right">
                            <div className="col-half mb-50">
                                <div className="fullname">Đắc Đạt</div>
                                <div className="btn-cover">
                                    <button className="btn-edit btn">Edit Profile</button>
                                </div>
                            </div>
                            <div className="b-0">
                                <div className="col-half">
                                    <div className="work-status">
                                        <strong>N/A</strong>
                                        <span>On working</span>
                                    </div>
                                    <div className="work-status">
                                        <strong>N/A</strong>
                                        <span>jobs completed</span>
                                    </div>
                                </div>
                                <div className="col-half">
                                    <div className="work-status">
                                        <strong>N/A</strong>
                                        <span>be hiring</span>
                                    </div>
                                    <div className="work-status">
                                        <strong>N/A</strong>
                                        <span>repeat hire rate</span>
                                    </div>
                                </div>
                                <div className="col-half">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faPhone} className="icon m-0" />
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon m-0 icon={faCakeCandles} className="icon m-0" />
                                        <span>{user.dob.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className="col-half m-0">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                        <span>{user.address}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon m-0 icon={faVenusMars} className="icon m-0" />
                                        <span>{user.gender}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header">
                            <div className="profile-header-name">Experiences</div>
                            <Button variant="primary" onClick={handleShow}>
                                Edit Experience
                            </Button>
                        </div>
                        <div className="profile-body">

                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="profile-input">
                        <div className="profile-header">
                            <div className="profile-header-name">Verifications</div>
                        </div>
                        <div className="profile-body verification">
                            <div className="item">
                                <FontAwesomeIcon icon={faUser} className="item-icon" />
                                <span className="item-name">identity verified</span>
                                <span className='item-verify'>Verify</span>
                            </div>
                            <div className="item">
                                <FontAwesomeIcon icon={faEnvelope} className="item-icon" />
                                <span className="item-name">email verified</span>
                                <FontAwesomeIcon icon={faCheck} className="item-icon icon-check" />
                            </div>
                            <div className="item">
                                <img src="/images/momo.png" alt="" className='item-icon' />
                                <span className="item-name">Payment verified</span>
                                <span className='item-verify'>Verify</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header flex-right">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <span className="category-name">{`${category.categoryName}`}</span>
                                    <span className="level">{` Level ${levelList.find(lv => lv.levelId == category.levelId)?.levelName}`}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        categoryList.map((category, index) => {
                                            return (
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => { handleSelect(category) }}>{category.categoryName}</Dropdown.Item>
                                                </div>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="profile-body">
                            {
                                category.skillList.map((skill) => {
                                    return (
                                        <div className="item">
                                            <img src={skill.skillIcon} alt="" className="item-icon" />
                                            <span className="item-name">{skill.skillName}</span>
                                            <span className='item-verify'>Certification</span>
                                        </div>
                                    )
                                })
                            }
                            <button className="btn btn-update-specialty">Upgrade This Specialty</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal id="CandidateProfileModal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Experiences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input">
                        <span>Experience Name</span>
                        <input className='input-profile' type="text" placeholder="Experience Name" />
                    </div>
                    <div className="input">
                        <span>Experience Detail</span>
                        <textarea className='input-profile' placeholder="Experience Description" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add Experience
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
