import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EmployeeProfile.css"
import { faCakeCandles, faHouse, faPhone, faRightToBracket, faVenusMars } from "@fortawesome/free-solid-svg-icons";

const EmployeeProfile = () => {
    return (
        <div id="EmployeeProfile">
            <div id="Manager">
                <div className="banner-img">
                    <img src="/images/employee-banner.jpg" alt="banner" />
                </div>
                <div className="profile-container">
                    <div className="profile">
                        <div className="col-left">
                            <img src="/images/avt.jpg" className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                <span>Joined February 15, 2023</span>
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
                                        <strong>Position</strong>
                                        <span>Manager</span>
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
                                <div className="col-half">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                        <span>HCM, Viet Nam</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon m-0 icon={faVenusMars} className="icon m-0" />
                                        <span>Male</span>
                                    </div>
                                </div>
                                <div className="col-half">
                                    <div className="work-status">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti rerum quis veritatis ratione. Mollitia, veniam! Quisquam non, harum laboriosam odio nisi deleniti ea ad quis exercitationem temporibus sed, aliquam aliquid?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeProfile;