import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faAddressBook, faBusinessTime, faCoins, faDotCircle, faEnvelope, faLocationDot, faMagnifyingGlass, faMarsAndVenus, faMedal, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./RecruitmentPostDetail.css";
import { Dropdown } from 'react-bootstrap';
import "./Filter.css";
import { Candidate, Category, SkillEntity, SpecialtyEntity, dataEngineer, developer } from '../../../../model';
import CandidateAssign from './CandidateAssign';
import { useSelector } from 'react-redux';
import ViewAssign from '../../../pages/Enterprise/ViewAssign';
import { useParams } from 'react-router-dom';
import { getAllSkill, getCandidateByListSkill, getCandidateBySpecialtyId, getCandidatesConfirmed, getPostByPostId } from '../../../../redux/apiRequest';
import { CandidateConfirmed, CandidateForAssign, CandidateResponse, PostResponse } from '../../../../entity';
import { getDaysLeft } from '../../../../handle';
import MessageBox from '../Popup/MessageBox/MessageBox';
import axios from '../../../../api/axios';

const RecruitmentPostDetail = () => {
    const { id } = useParams();
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const specialtiesSystem = useSelector((state: any) => state.specialty.specialties.specialty);

    const [specialty, setSpecialty] = useState<SpecialtyEntity>(specialtiesSystem[0]);
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState<PostResponse>();



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setPost(await getPostByPostId(id));
    }


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
                                    <h1 className="post-name">{post?.title}</h1>
                                    <div className="company-name">{post?.creator.name}</div>
                                    <div className="post-time">
                                        <FontAwesomeIcon icon={faClock} className="icon primary-color mr-8" />
                                        Hạn nộp hồ sơ: {`${post?.expiryDate}`}
                                    </div>
                                </div>
                                {
                                    (account?.role.name === "EMPLOYEE") ?
                                        (<div className="btn-assign">
                                            <button onClick={handleOpen}>Assign Candidate</button>
                                        </div>)
                                        : (account?.role.name === "ENTERPRISE") ?
                                            (<div className="btn-assign">
                                                <button onClick={handleOpen}>Assigned List</button>
                                            </div>)
                                            :
                                            null
                                            // <div className="btn-assign">
                                            //     <button onClick={handleOpen}>Apply Now!</button>
                                            // </div>
                                }
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
                                                <span>{post?.salaryDetail}</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faBusinessTime} className="icon primary-color" />
                                            <div>
                                                <strong>Work form</strong>
                                                <br />
                                                <span>{post?.typeOfWork}</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faPerson} className="icon primary-color" />
                                            <div>
                                                <strong>Quantity</strong>
                                                <br />
                                                <span>{post?.quantity} persons</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faMedal} className="icon primary-color" />
                                            <div>
                                                <strong>Experience</strong>
                                                <br />
                                                <span>{post?.experience}</span>
                                            </div>
                                        </div>
                                        <div className="general-item">
                                            <FontAwesomeIcon icon={faClock} className="icon primary-color" />
                                            <div>
                                                <strong>Time remainding</strong>
                                                <br />
                                                <span>{post && getDaysLeft(post?.createAt, post?.expiryDate)} days left to apply</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="general-information" style={{ marginBottom: "32px" }}>
                                    <p>Work location</p>
                                    <div className="general-item">
                                        <span>-{post?.workLocation}</span>
                                    </div>
                                </div>
                                <div className="general-description">
                                    <h3>Job description</h3>
                                    <div className="general-item">
                                        <ul>
                                            <li>Thiết kế và phát triển các website WordPress</li>
                                            <li>Thiết kế Landing page</li>
                                            <li>Phát triển các tính năng cho themes</li>
                                            <li>Tham gia vào quy trình phát triển sản phẩm, đảm bảo chất lượng và tiến độ.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="general-description">
                                    <h3>Candidate requirements</h3>
                                    <div className="general-item">
                                        <ul>
                                            <li>Thiết kế và phát triển các website WordPress</li>
                                            <li>Thiết kế Landing page</li>
                                            <li>Phát triển các tính năng cho themes</li>
                                            <li>Tham gia vào quy trình phát triển sản phẩm, đảm bảo chất lượng và tiến độ.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="general-description">
                                    <h3>Benefits</h3>
                                    <div className="general-item">
                                        <ul>
                                            <li>Thiết kế và phát triển các website WordPress</li>
                                            <li>Thiết kế Landing page</li>
                                            <li>Phát triển các tính năng cho themes</li>
                                            <li>Tham gia vào quy trình phát triển sản phẩm, đảm bảo chất lượng và tiến độ.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3 right">
                        <div className="card">

                            <div className="right-item">
                                <p className='item-name'>Website</p>
                                <div className="item-description">
                                    <a href={post?.creator.website} style={{ textTransform: "none" }}>{post?.creator.website}</a>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Company Scale</p>
                                <div className="description p0-14">
                                    {post?.creator.scale}
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Specialty</p>
                                <div className="item-list">
                                    <div className="item">
                                        {post?.specialty}
                                    </div>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Skills</p>
                                <div className="item-list">
                                    {
                                        post?.skills && post?.skills.length > 0 && post?.skills.map((skill, index) => {
                                            return (
                                                <div className="item" key={index}>
                                                    {skill.skillName}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Introduce</p>
                                <div className="description p0-14">
                                    <span>{post?.creator.introduction}</span>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Contact</p>
                                <div className="description p0-14">
                                    <div className="description-item">
                                        <FontAwesomeIcon icon={faUser} className="icon primary-color mr-8" />
                                        {post?.hrName}
                                    </div>
                                    <div className="description-item">
                                        <FontAwesomeIcon icon={faEnvelope} className="icon primary-color mr-8" />
                                        {post?.hrEmail}
                                    </div>
                                    <div className="description-item">
                                        <FontAwesomeIcon icon={faAddressBook} className="icon primary-color mr-8" />
                                        {post?.hrPhone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                (account?.role.name === "EMPLOYEE") ?
                    (<Modal
                        id="AssignModal"
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className='assign-modal'>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <h2>Brief Information</h2>
                                <div className="modal-item">
                                    <p className='item-name'>Specialty:</p>
                                    <div className="modal-list">
                                        <div className="item">
                                            {post?.specialty}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-item">
                                    <p className='item-name'>Skills:</p>
                                    <div className="modal-list">
                                        {
                                            post?.skills.map((skill, index) => {
                                                return (
                                                    <div className="item" key={index}>
                                                        {skill.skillName}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="assign-container">
                                    <h2>Suitable candidates</h2>
                                    <div className="candidates-container">
                                        <div className="filter">
                                            <div className="filter-form-input">
                                                <div className="filter-input-icon">
                                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                                                </div>
                                                <input type="text" placeholder='Enter search keywords' />
                                            </div>
                                            <Dropdown className="filter-dropdown ml-8">
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                                                    <span>{specialty?.name}</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className='filter-menu'>
                                                    {
                                                        specialtiesSystem.map((specialty: SpecialtyEntity) => {
                                                            return (
                                                                <div key={specialty.id}>
                                                                    <Dropdown.Item className='filter-item' onClick={() => {
                                                                        setSpecialty(specialty)
                                                                    }}>{specialty.name}</Dropdown.Item>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <button className='btn-search ml-8'>Search</button>
                                        </div>
                                        <div style={{ height: 500, width: '100%' }}>
                                            {
                                                <CandidateAssign />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>)
                    : (account?.role.name === "ENTERPRISE") ?
                        (<Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className='assign-modal'>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className="assign-container">
                                        <h2>Candidates</h2>
                                        <div className="candidates-container">
                                            <div className="filter">
                                                <div className="filter-form-input">
                                                    <div className="filter-input-icon">
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                                                    </div>
                                                    <input type="text" placeholder='Enter search keywords' />
                                                </div>
                                                <Dropdown className="filter-dropdown ml-8">
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                                                        <span>{specialty.name}</span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className='filter-menu'>
                                                        {
                                                            specialtiesSystem.map((specialty: SpecialtyEntity) => {
                                                                return (
                                                                    <div key={specialty.id}>
                                                                        <Dropdown.Item className='filter-item' onClick={() => {
                                                                            setSpecialty(specialty);
                                                                        }}>{specialty.name}</Dropdown.Item>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <button className='btn-search ml-8'>Search</button>
                                            </div>
                                            <div style={{ height: 500, width: '100%' }}>
                                                {
                                                    <ViewAssign />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </Box>
                        </Modal>)
                        :
                        (
                            <div></div>
                        )
            }
        </div>
    )
}

export default RecruitmentPostDetail