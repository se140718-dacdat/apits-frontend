import React, { FC } from 'react'
import "./CandidateProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faPhone, faCakeCandles, faHouse, faVenusMars } from '@fortawesome/free-solid-svg-icons'

export const CandidateProfile: FC = () => {
    return (
        <div id='CandidateProfile'>
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
                    <div className="profile">
                        <div className="col-left">
                            <img src="images/avt.jpg" className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                Joined February 15, 2023
                            </div>
                        </div>
                        <div className="col-right">

                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="profile">
                        <div className="col-left">
                            <img src="images/avt.jpg" className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                Joined February 15, 2023
                            </div>
                        </div>
                        <div className="col-right">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
