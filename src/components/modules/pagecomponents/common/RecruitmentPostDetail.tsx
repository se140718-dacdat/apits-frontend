import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faAddressBook, faBusinessTime, faCoins, faEnvelope, faMedal, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDaysLeft } from '../../../../handle';
import { currencyMaskString } from '../../../../mask';
import { getPostByPostId } from '../../../../redux/apiRequest';
import ViewAssign from '../../../pages/Enterprise/ViewAssign';
import CandidateAssign from './CandidateAssign';
import "./Filter.css";
import "./RecruitmentPostDetail.css";
import { PostResponse } from '../../../../Models';

const RecruitmentPostDetail = () => {
    const { id } = useParams();
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const user = useSelector((state: any) => state.user.user.user);
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
        console.log(post)
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
                                    <img src={post?.creator.image} alt="" className="post-avt" />
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
                                        : (account?.role.name === "ENTERPRISE" && user?.id === post?.creator.id) ?
                                            (<div className="btn-assign">
                                                <button onClick={handleOpen}>Assigned List</button>
                                            </div>)
                                            :
                                            null
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
                                                <span>{post?.salaryDetail && currencyMaskString(post?.salaryDetail)}</span>
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
                                            {
                                                post?.description.split("\n").map((str) =>
                                                    <li>{str}</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="general-description">
                                    <h3>Candidate requirements</h3>
                                    <div className="general-item">
                                        <ul>
                                            {
                                                post?.requirement.split("\n").map((str) =>
                                                    <li>{str}</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="general-description">
                                    <h3>Benefits</h3>
                                    <div className="general-item">
                                        <ul>
                                            {
                                                post?.benefits.split("\n").map((str) =>
                                                    <li>{str}</li>
                                                )
                                            }
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
                                        {post?.specialtyExperience.specialty.name} <strong>{post?.specialtyExperience.experience.name}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Skills</p>
                                <div className="item-list">
                                    {
                                        post?.skillLevels && post?.skillLevels.length > 0 && post?.skillLevels.map((skill) => {
                                            return (
                                                <div className="item" key={skill.skillLevelId}>
                                                    {skill.skillName} Level {skill.level}
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
                                            {post?.specialtyExperience.specialty.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-item">
                                    <p className='item-name'>Experience:</p>
                                    <div className="modal-list">
                                        <div className="item">
                                            {post?.specialtyExperience.experience.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-item">
                                    <p className='item-name'>Skills:</p>
                                    <div className="modal-list">
                                        {
                                            post?.skillLevels.map((skill) => {
                                                return (
                                                    <div className="item" key={skill.skillLevelId}>
                                                        {skill.skillName} Level {skill.level}
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
                                        {/* <div className="filter">
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
                                        </div> */}
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