import React, { FC } from 'react'
import "./CandidateProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

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
                            <div className="col-half">
                                <div className="fullname">Đắc Đạt</div>
                                <button className="btn-edit btn">Edit Profile</button>
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
