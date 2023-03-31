import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faAddressBook, faBusinessTime, faCoins, faDotCircle, faEnvelope, faLocationDot, faMagnifyingGlass, faMarsAndVenus, faMedal, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./RecruitmentPostDetail.css";
import { Dropdown } from 'react-bootstrap';
import "./Filter.css"
import { Candidate, Category, dataEngineer, developer } from '../../../../model';
import CandidateAssign from './CandidateAssign';
import { useSelector } from 'react-redux';
import ViewAssign from '../../../pages/Enterprise/ViewAssign';


const candidates: Candidate[] = [
    {
        id: 1,
        name: "Lương Hồ Đắc Đạt",
        address: "Bình Chánh, HCM",
        gender: "Male",
        specialties: [
            {
                id: 1,
                name: "Front-end",
                skills: ["React", "JavaScript", "CSS"],
            },
            {
                id: 2,
                name: "Back-end",
                skills: ["Node.js", "SQL", "PHP"],
            },
        ],
        status: "approved"
    },
    {
        id: 2,
        name: "Phạm Thành Long",
        address: "Biên Hòa, Đồng Nai",
        gender: "Male",
        specialties: [
            {
                id: 1,
                name: "Front-end",
                skills: ["Angular", "TypeScript", "HTML"],
            },
            {
                id: 3,
                name: "Database",
                skills: ["SQL Server", "Oracle", "MySQL"],
            },
        ],
        status: ""
    },
];

const RecruitmentPostDetail = () => {
    const [category, setCategory] = useState<Category>(developer);
    const categoryList: Category[] = [developer, dataEngineer]
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const [open, setOpen] = useState(false);
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
                                            <div className="btn-assign">
                                                <button onClick={handleOpen}>Apply Now!</button>
                                            </div>
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
                                    </div>
                                </div>
                                <div className="general-information" style={{ marginBottom: "32px" }}>
                                    <p>Work location</p>
                                    <div className="general-item">
                                        <span>- Hà Nội: Ngõ 8 Nguyễn Văn Lộc, Mộ Lao, Hà Đông</span>
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
                                    <a href='https://www.topcv.vn/viec-lam/lap-trinh-vien-front-end-develop-wordpress/944198.html'>https://www.topcv.vn/viec-lam/lap-trinh-vien-front-end-develop-wordpress/944198.html</a>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Company Scale</p>
                                <div className="description p0-14">
                                    Over 1000
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Specialty</p>
                                <div className="item-list">
                                    <div className="item">
                                        Developer
                                    </div>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Skills</p>
                                <div className="item-list">
                                    <div className="item">
                                        Java
                                    </div>
                                    <div className="item">
                                        Python
                                    </div>
                                    <div className="item">
                                        SQL
                                    </div>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Introduce</p>
                                <div className="description p0-14">
                                    <span>Công ty TNHH SAPAN VIỆT NAM, là start-up công nghệ cung cấp hệ thống và dịch vụ logistic và fulfillment cho các các website thương mại điện tử tại thị trường Mỹ. Chúng tôi đã và đang phục vụ hơn 20 website thương mại điện tử lớn tại Mỹ. Sứ mệnh của chúng tôi là dành mọi nguồn lực để xây dựng, vận hành và phát triển hoạt động kinh doanh thương mại điện tử tạo ra các thương hiệu có giá trị toàn cầu.</span>
                                </div>
                            </div>
                            <div className="right-item">
                                <p className='item-name'>Contact</p>
                                <div className="description p0-14">
                                    <div className="description-item">
                                        <FontAwesomeIcon icon={faUser} className="icon primary-color mr-8" />
                                        HR 1
                                    </div>
                                    <div className="description-item">
                                        <FontAwesomeIcon icon={faEnvelope} className="icon primary-color mr-8" />
                                        hr1@gmail.com
                                    </div>
                                    <div className="description-item">
                                        <FontAwesomeIcon icon={faAddressBook} className="icon primary-color mr-8" />
                                        0123456789
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
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className='assign-modal'>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Brief Information
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
                                                    <span>{category.categoryName}</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className='filter-menu'>
                                                    {
                                                        categoryList.map((category) => {
                                                            return (
                                                                <div key={category.categoryId}>
                                                                    <Dropdown.Item className='filter-item' onClick={() => { setCategory(category) }}>{category.categoryName}</Dropdown.Item>
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
                                                (account?.role.name === "EMPLOYEE") ?
                                                    <CandidateAssign candidates={candidates} />
                                                    :
                                                    <ViewAssign candidates={candidates} />
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
                                                        <span>{category.categoryName}</span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className='filter-menu'>
                                                        {
                                                            categoryList.map((category) => {
                                                                return (
                                                                    <div key={category.categoryId}>
                                                                        <Dropdown.Item className='filter-item' onClick={() => { setCategory(category) }}>{category.categoryName}</Dropdown.Item>
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
                                                    (account?.role.name === "EMPLOYEE") ?
                                                        <CandidateAssign candidates={candidates} />
                                                        :
                                                        <ViewAssign candidates={candidates} />
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