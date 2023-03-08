import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faBusinessTime, faCoins, faLocationDot, faMarsAndVenus, faMedal, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./RecruitmentPostDetail.css";

const RecruitmentPostDetail = () => {
    return (
        <div id='RecruitmentPostDetail'>
            <div className="post-wrap">

                <div className="row">
                    <div className="col-12 col-xl-9 leftside">
                        <div className="card">
                            <div className="post-header">
                                <div className="avt-post-cover inline-block">
                                    <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                                </div>
                                <div className="post-header-content">
                                    <h1 className="post-name">{`PHP Developer (Magento)`}</h1>
                                    <div className="company-name">CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HTCSOFT VIỆT NAM</div>
                                    <div className="post-time">
                                        <FontAwesomeIcon icon={faClock} className="icon primary-color mr-8" />
                                        Hạn nộp hồ sơ: 08/04/2023
                                    </div>
                                </div>
                                <div className="btn-assign">
                                    <button>Assign Candidate</button>
                                </div>
                            </div>
                            <div className="post-content">
                                <h2 className="detail-title">Recruitment details</h2>
                                <div className="general-information">
                                    <p>General information</p>
                                    <div className="general-body">
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faCoins} className="icon primary-color" />
                                            <div>
                                                <strong>Salary</strong>
                                                <br />
                                                <span>$70 - $90/hr</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faBusinessTime} className="icon primary-color" />
                                            <div>
                                                <strong>Work form</strong>
                                                <br />
                                                <span>Fulltime</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faPerson} className="icon primary-color" />
                                            <div>
                                                <strong>Quantity</strong>
                                                <br />
                                                <span>4 persons</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faMarsAndVenus} className="icon primary-color" />
                                            <div>
                                                <strong>Gender</strong>
                                                <br />
                                                <span>Male</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faMedal} className="icon primary-color" />
                                            <div>
                                                <strong>Experience</strong>
                                                <br />
                                                <span>1 year</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faClock} className="icon primary-color" />
                                            <div>
                                                <strong>Time remainding</strong>
                                                <br />
                                                <span>17 days left to apply</span>
                                            </div>
                                        </div>
                                        <div className="address">

                                        </div>
                                    </div>
                                </div>
                                <div className="general-information">
                                    <p>Work location</p>
                                    <div className="general-item">
                                        <span>- Hà Nội: Ngõ 8 Nguyễn Văn Lộc, Mộ Lao, Hà Đông</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3 right">
                        <div className="avt-post-cover inline-block">
                            <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecruitmentPostDetail