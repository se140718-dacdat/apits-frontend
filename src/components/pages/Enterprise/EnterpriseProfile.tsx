import { faBuilding, faBusinessTime, faClock, faCoins, faEarthAmericas, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FC, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { PostResponse } from '../../../entity';
import { getDaysLeft } from '../../../handle';
import "./EnterpriseProfile.css";
import { Paging } from '../../modules/pagecomponents/common/Paging';

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
    const [posts, setPosts] = useState<PostResponse[]>();
    const [pageTotal, setPageTotal] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const navigate = useNavigate();
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const fetchData = async (): Promise<PostResponse[]> => {
        const response = await axios.get<{ data: { responseList: PostResponse[], totalPage: number } }>(`/recruitmentRequest/getByCreator?id=${user?.id}&pageNo=${currentPage}&pageSize=5`);
        const data = response?.data?.data?.responseList;
        setPageTotal(response?.data.data.totalPage - 1);
        setPosts(data);
        return data;
    }

    const handleEdit = () => {
        const updateEnterprise = {
            name: name,
            email: email,
            scale: scale,
            website: website,
            address: address,
            introduction: introduction,
            avatar: avatar,
            cover: cover
        }
        console.log(updateEnterprise)
    }

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
                            <img src={user?.image} className='avt-enterprise' alt="" />
                        </div>
                        <div className="information">
                            <div className="information-left">
                                <div className="enterprise-name">{user?.name}</div>
                                <div className="flex-haft">
                                    <div className="enterprise-about inline-block">
                                        <FontAwesomeIcon icon={faEarthAmericas} className="icon pr-4" />
                                        {user?.website}</div>
                                    <div className="enterprise-about inline-block">
                                        <FontAwesomeIcon icon={faEnvelope} className="icon pr-4" />
                                        {user?.email}</div>
                                    <div className="enterprise-about inline-block">
                                        <FontAwesomeIcon icon={faBuilding} className="icon pr-4" />
                                        {user?.scale}</div>
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
                    <div className="enterprise-introduction">{user?.introduction}</div>
                    <h6>Company Address</h6>
                    <div className="address">
                        <FontAwesomeIcon icon={faLocationDot} className="icon pr-4" style={{ color: "var(--primary-color)" }} />
                        {user?.address}
                    </div>
                </div>
                <div className="profile-detail">
                    <h4>Recruitment Posts</h4>
                    <div className="post-list">
                        {
                            posts?.map((post: PostResponse, index) => {
                                return (
                                    <div className="post" onClick={() => { navigate(`/post-detail/${post.id}`) }} key={index}>
                                        <div className="avt-post-cover inline-block">
                                            <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                                        </div>
                                        <div className="post-detail inline-block">
                                            <div className="post-name">{post.title}</div>
                                            <div className="post-company-name">{post.creator.name}</div>
                                        </div>
                                        <div className="skills">
                                            {
                                                post?.skills.map((skill, index) => {
                                                    return (
                                                        <div className="skill" key={index}>
                                                            {skill.skillName}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="post-description">
                                            <div className="description-item">
                                                <FontAwesomeIcon icon={faCoins} className="icon primary-color mr-8" />
                                                {post.salaryDetail}
                                            </div>
                                            <div className="description-item">
                                                <FontAwesomeIcon icon={faBusinessTime} className="icon primary-color mr-8" />
                                                {post.typeOfWork}
                                            </div>
                                            <div className="description-item">
                                                <FontAwesomeIcon icon={faClock} className="icon primary-color mr-8" />
                                                {getDaysLeft(post?.createAt, post?.expiryDate) > 0 ? `${getDaysLeft(post?.createAt, post?.expiryDate)} days left to apply` : "Expired"}
                                            </div>
                                            <div className="description-item">
                                                <FontAwesomeIcon icon={faLocationDot} className="icon primary-color mr-8" />
                                                {post.creator.address}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Paging currentPage={currentPage} pageTotal={pageTotal} setCurrentPage={setCurrentPage}/>
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
                                <img src={user?.image} alt="" className="post-avt" />
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
                    <Button variant="primary" onClick={() => {
                        handleCloseUpdate();
                        handleEdit();
                    }
                    }>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EnterpriseProfile