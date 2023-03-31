import React, { FC, useState } from 'react'
import "./EnterpriseProfile.css";
import { faEarthAmericas, faBuilding, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const EnterpriseProfile: FC = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [showUpdate, setShowUpdate] = useState(false);
    const [avatar, setAvatar] = useState<string>(user?.image || "/images/avt-blank.png");
    const [cover, setCover] = useState<string>(user?.image || "/images/avt-blank.png");
    const [name, setName] = useState<string>(user?.name || "Company name");
    const [email, setEmail] = useState<string>(user?.email || "Email");
    const [scale, setScale] = useState<string>(user?.scale || "Scale");
    const [website, setWebsite] = useState<string>(user?.website || "Website");
    const [address, setAddress] = useState<string>(user?.address || "Company address");
    const [introduction, setIntroduction] = useState<string>(user?.introduction || "Introduction");


    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const convertFile = async (files: FileList | null, type: string) => {
        if (files) {
            const fileRef = files[0];
            const fileType = fileRef.type;
            const fileData = fileRef.slice();
            const storageRef = ref(storage, fileRef.name);

            try {
                // Upload the file to Firebase Storage
                const snapshot = await uploadBytes(storageRef, fileData);

                // Get the download URL for the file
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Set the state to the download URL
                (type == "avater") ?
                    setAvatar(downloadURL)
                    :
                    setCover(downloadURL)
                    ;
            } catch (error) {
                console.error(error);
            }
        }
    };

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
                                    <div className="enterprise-about inline-block">
                                        <FontAwesomeIcon icon={faEarthAmericas} className="icon pr-4" />
                                        https://tuyendung.mia.vn/</div>
                                    <div className="enterprise-about inline-block">
                                        <FontAwesomeIcon icon={faEnvelope} className="icon pr-4" />
                                        {user?.email}</div>
                                    <div className="enterprise-about inline-block">
                                        <FontAwesomeIcon icon={faBuilding} className="icon pr-4" />
                                        100-499 nhân viên</div>
                                </div>
                            </div>
                            <div className="information-right">
                                <button className="btn-edit btn" onClick={() => { handleShowUpdate() }}>Edit Profile</button>
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
            <Modal id="EnterpriseProfileModal" show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: "45%" }}>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="edit-container">
                        <div className="edit-title">
                            <span className='fontsize-125rem bold'>Profile picture</span>
                            <span className='weight400 fontsize-10625rem link' onClick={(e) => {
                                document.getElementById("img-file-avatar")?.click();
                            }}>Edit
                                <input type="file" id="img-file-avatar" accept='.jpg, .png' style={{ display: "none" }} onChange={(e) => { convertFile(e.target.files, "avatar") }} />
                            </span>
                        </div>
                        <div className="edit-body">
                            <div>
                                <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                            </div>
                        </div>
                    </div>
                    <div className="edit-container">
                        <div className="edit-title">
                            <span className='fontsize-125rem bold'>Cover photo</span>
                            <span className='weight400 fontsize-10625rem link' onClick={(e) => {
                                document.getElementById("img-file-cover")?.click();
                            }}>Edit
                                <input type="file" id="img-file-cover" accept='.jpg, .png' style={{ display: "none" }} onChange={(e) => { convertFile(e.target.files, "cover") }} />
                            </span>
                        </div>
                        <div className="edit-body">
                            <div className='cover-photo'>
                                <img src="https://static.topcv.vn/company_covers/cong-ty-co-phan-tga-c3d802c3b6c9f22302425aa2424a87f3-63ec41af5f944.jpg" alt="" className="post-avt" />
                            </div>
                        </div>
                    </div>
                    <div className="edit-container">
                        <div className="edit-title">
                            <span className='fontsize-125rem bold'>Customize your intro</span>
                            <span className='weight400 fontsize-10625rem link'>Edit</span>
                        </div>
                        <div className="edit-body">
                            <FloatingLabel className='edit-input' label="Company name">
                                <Form.Control type="text" value={name}
                                    placeholder={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    required />
                            </FloatingLabel>
                            <FloatingLabel className='edit-input' label="Website">
                                <Form.Control type="text" value={website}
                                    placeholder={website}
                                    onChange={(e) => {
                                        setWebsite(e.target.value);
                                    }}
                                    required />
                            </FloatingLabel>
                            <FloatingLabel className='edit-input' label="Email">
                                <Form.Control type="text" value={email}
                                    placeholder={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required />
                            </FloatingLabel>
                            <FloatingLabel className='edit-input' label="Scale">
                                <Form.Control type="text" value={scale}
                                    placeholder={scale}
                                    onChange={(e) => {
                                        setScale(e.target.value);
                                    }}
                                    required />
                            </FloatingLabel>
                            <FloatingLabel className='edit-input' label="Company address">
                                <Form.Control type="text" value={address}
                                    placeholder={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    required />
                            </FloatingLabel>
                            <FloatingLabel className='edit-input' controlId="floatingTextarea2" label="Introduction">
                                <Form.Control
                                    as="textarea"
                                    value={introduction}
                                    placeholder={introduction}
                                    style={{ height: '150px' }}
                                    onChange={(e) => {
                                        setIntroduction(e.target.value);
                                    }}
                                    required 
                                />
                            </FloatingLabel>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button-close' variant="secondary" onClick={handleCloseUpdate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseUpdate}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EnterpriseProfile