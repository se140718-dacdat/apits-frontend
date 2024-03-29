import { faBuilding, faBusinessTime, faClock, faCoins, faEarthAmericas, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FC, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { getDaysLeft } from '../../../handle';
import "./EnterpriseProfile.css";
import { Paging } from '../../modules/pagecomponents/common/Paging';
import { updateEnterprise } from '../../../redux/apiRequest';
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import { PostResponse } from '../../../Models';

const storage = getStorage();

const EnterpriseProfile: FC = () => {
    const user = useSelector((state: any) => state.user.user.user);
    const [showUpdate, setShowUpdate] = useState(false);
    const [avatar, setAvatar] = useState<string>(user?.image || "/images/avt-blank.png");
    const [phone, setPhone] = useState<string>(user?.phone || "Company phone");
    const [email, setEmail] = useState<string>(user?.email || "Email");
    const [scale, setScale] = useState<string>(user?.scale || "Scale");
    const [website, setWebsite] = useState<string>(user?.website || "Website");
    const [address, setAddress] = useState<string>(user?.address || "Company address");
    const [introduction, setIntroduction] = useState<string>(user?.introduction || "Introduction");
    const [posts, setPosts] = useState<PostResponse[]>();
    const [pageTotal, setPageTotal] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const navigate = useNavigate();
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    // const fetchData = async (): Promise<PostResponse[]> => {
    //     const response = await axios.get<{ data: { responseList: PostResponse[], totalPage: number } }>(`/recruitmentRequest/getByCreator?id=${user?.id}&pageNo=${currentPage}&pageSize=5`);
    //     const data = response?.data?.data?.responseList;
    //     setPageTotal(response?.data.data.totalPage - 1);
    //     setPosts(data);
    //     return data;
    // }

    const fetchData = async () => {
        await axios.get(`/recruitmentRequest/getByCreator?id=${user?.id}&pageNo=${currentPage}&pageSize=10`).then((res) => {
            const data = res.data
            if (data.status === "SUCCESS") {
                setPosts(data.data.responseList);
                setPageTotal(data.data.totalPage - 1);
            }
        })
    }

    const handleEdit = async () => {
        const request = {
            address: address,
            phone: phone,
            scale: scale,
            website: website,
            image: avatar,
            introduction: introduction,
        }
        console.log(request);
        if (await updateEnterprise(user?.id, request) === "SUCCESS") {
            handleCloseUpdate();
            setMessage("Update successful!");
            setMessageStatus("green");
        } else {
            setMessage("Update fail!");
            setMessageStatus("red");
        }
    }

    const convertFile = async (files: FileList | null) => {
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
                setAvatar(downloadURL);
                console.log(downloadURL)
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div id='EnterpriseProfile'>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
            <div className="profile-container">
                <div className="profile-header">
                    <img src="/images/company-banner.jpg" className='banner' alt="" />
                    <div className="overview">
                        <div className="avt-cover">
                            <img src={avatar} className='avt-enterprise' alt="" />
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
                            posts && posts?.map((post: PostResponse, index) => {
                                return (
                                    <div className="post" onClick={() => { navigate(`/post-detail/${post.id}`) }} key={index}>
                                        <div className="avt-post-cover inline-block">
                                            <img src={post.creator.image} alt="" className="post-avt" />
                                        </div>
                                        <div className="post-detail inline-block">
                                            <div className="post-name">{post.title}</div>
                                            <div className="post-company-name">{post.creator.name}</div>
                                        </div>
                                        <div className="skills">
                                            {
                                                post?.skillLevels.map((skill, index) => {
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
                    <Paging currentPage={currentPage} pageTotal={pageTotal} setCurrentPage={setCurrentPage} />
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
                            <div className='weight400 fontsize-10625rem link' onClick={(e) => {
                                document.getElementById("img-file-avatar")?.click();
                            }}>Edit
                                <input type="file" id="img-file-avatar" accept='.jpg, .png' style={{ display: "none" }} onChange={(e) => { convertFile(e.target.files) }} />
                            </div>
                        </div>
                        <div className="edit-body">
                            <div>
                                <img src={avatar} alt="" className="post-avt" />
                            </div>
                        </div>
                    </div>
                    <div className="edit-container">
                        <div className="edit-title">
                            <span className='fontsize-125rem bold'>Customize your intro</span>
                        </div>
                        <div className="edit-body">
                            <FloatingLabel className='edit-input' label="Website">
                                <Form.Control type="text" value={website}
                                    placeholder={website}
                                    onChange={(e) => {
                                        setWebsite(e.target.value);
                                    }}
                                    required />
                            </FloatingLabel>
                            <FloatingLabel className='edit-input' label="Company phone">
                                <Form.Control type="text" value={phone}
                                    placeholder={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
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