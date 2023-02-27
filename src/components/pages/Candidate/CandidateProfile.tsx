import React, { FC, useState } from 'react'
import "./CandidateProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faPhone, faCakeCandles, faHouse, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';

export const CandidateProfile: FC = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                                Joined February 15, 2023
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
                                        <span>0774816851</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon m-0 icon={faCakeCandles} className="icon m-0" />
                                        <span>14/12/2000</span>
                                    </div>
                                </div>
                                <div className="col-half m-0">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                        <span>HCM, Viet Nam</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon m-0 icon={faVenusMars} className="icon m-0" />
                                        <span>Male</span>
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
                        <div className="profile-body">

                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header">
                            <div className="profile-header-name">Certifications</div>
                        </div>
                        <div className="profile-body">

                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Experiences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input">
                        <span>Experience Name</span>
                        <input className='input-profile' type="text" placeholder="Certificate Link" />
                    </div>
                    <div className="input">
                        <span>Experience Detail</span>
                        <textarea className='input-profile' placeholder="Certificate Name" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add Certificate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
