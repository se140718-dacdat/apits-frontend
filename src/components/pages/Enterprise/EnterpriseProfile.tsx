import React, { FC } from 'react'
import "./EnterpriseProfile.css";
import { faEarthAmericas, faBuilding, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EnterpriseProfile: FC = () => {
    return (
        <div id='EnterpriseProfile'>
            <div className="profile-container">
                <div className="profile-header">
                    <img src="https://static.topcv.vn/company_covers/cong-ty-co-phan-tga-c3d802c3b6c9f22302425aa2424a87f3-63ec41af5f944.jpg" className='banner' alt="" />
                    <div className="overview">
                        <div className="avt-cover">
                            <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" className='avt-enterprise' alt="" />
                        </div>
                        <div className="information">
                            <div className="information-left">
                                <div className="enterprise-name">Công Ty Cổ Phần TGA</div>
                                <div className="flex-haft">
                                    <div className="enterprise-link inline-block">
                                        <FontAwesomeIcon icon={faEarthAmericas} className="icon pr-4" />
                                        https://tuyendung.mia.vn/</div>
                                    <div className="employee-quantity inline-block">
                                        <FontAwesomeIcon icon={faBuilding} className="icon pr-4" />
                                        100-499 nhân viên</div>
                                </div>
                            </div>
                            <div className="information-right">
                                <button className="btn-edit btn">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-detail">
                    <h4>Introduction</h4>
                    <div className="enterprise-introduction">
                        Được thổi hồn từ niềm đam mê du lịch của Founder Trần Anh Tuấn, thương hiệu MIA.vn đã ra đời vào năm 2014 với tầm nhìn trở thành chuỗi hành lý số 1 tại thị trường Việt Nam.

                        Với niềm tin mãnh liệt: nhà bán lẻ không bán sản phẩm, và chỉ bán cho Khách hàng sự hài lòng - niềm vui khi mua sắm, thương hiệu MIA.vn – thuộc công ty TGA đã có chỗ vững chắc trong lòng khách hàng trong suốt 8 năm nay.

                        Đến nay, chúng tôi đã có hơn 24 cửa hàng bán lẻ trên toàn quốc. Chặng hành trình tiếp theo sẽ là chinh phục cột mốc 100 cửa hàng trên toàn quốc vào năm 2026.
                    </div>
                    <h6>Company Address</h6>
                    <div className="address">
                        <FontAwesomeIcon icon={faLocationDot} className="icon pr-4" />
                        117-119 Bạch đằng, Phường 15, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam
                    </div>
                </div>
                <div className="profile-detail">
                    <h4>Recruitment Posts</h4>
                    <div className="post-line">
                        <div className="post">
                            <div className="avt-post-cover inline-block">
                                <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                            </div>
                            <div className="post-detail inline-block">
                                <div className="post-name">Video Producer</div>
                                <div className="post-name">(Team Leader - Lương 25 - 30 Triệu)</div>
                                <div className="post-company-name">Công Ty Cổ Phần TGA</div>
                            </div>
                        </div>
                        <div className="post">
                            <div className="avt-post-cover inline-block">
                                <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                            </div>
                            <div className="post-detail inline-block">
                                <div className="post-name">Video Producer</div>
                                <div className="post-name">(Team Leader - Lương 25 - 30 Triệu)</div>
                                <div className="post-company-name">Công Ty Cổ Phần TGA</div>
                            </div>
                        </div>
                    </div>
                    <div className="post-line">
                        <div className="post">
                            <div className="avt-post-cover inline-block">
                                <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                            </div>
                            <div className="post-detail inline-block">
                                <div className="post-name">Video Producer</div>
                                <div className="post-name">(Team Leader - Lương 25 - 30 Triệu)</div>
                                <div className="post-company-name">Công Ty Cổ Phần TGA</div>
                            </div>
                        </div>
                        <div className="post">
                            <div className="avt-post-cover inline-block">
                                <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                            </div>
                            <div className="post-detail inline-block">
                                <div className="post-name">Video Producer</div>
                                <div className="post-name">(Team Leader - Lương 25 - 30 Triệu)</div>
                                <div className="post-company-name">Công Ty Cổ Phần TGA</div>
                            </div>
                        </div>
                    </div>
                    <div className="post-line">
                        <div className="post">
                            <div className="avt-post-cover inline-block">
                                <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                            </div>
                            <div className="post-detail inline-block">
                                <div className="post-name">Video Producer</div>
                                <div className="post-name">(Team Leader - Lương 25 - 30 Triệu)</div>
                                <div className="post-company-name">Công Ty Cổ Phần TGA</div>
                            </div>
                        </div>
                        <div className="post">
                            <div className="avt-post-cover inline-block">
                                <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                            </div>
                            <div className="post-detail inline-block">
                                <div className="post-name">Video Producer</div>
                                <div className="post-name">(Team Leader - Lương 25 - 30 Triệu)</div>
                                <div className="post-company-name">Công Ty Cổ Phần TGA</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterpriseProfile