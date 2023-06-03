import { faAddressCard, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotificationEntity, User } from '../../../../model';
import { logoutUser } from '../../../../redux/apiRequest';
import "./UserHeader.css";
import Notification from '../Popup/Notification/Notification';
import axios from '../../../../api/axios';


interface Props {
    setUser: Dispatch<SetStateAction<User | null>>;
}
const CandidateHeader: FC<Props> = (props) => {
    const [show, setShow] = useState<string>("display-none");
    const user = useSelector((state: any) => state.user.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<NotificationEntity[]>([]);
    const logoutHandler = () => {
        logoutUser(dispatch, navigate)
    }

    useEffect(() => {
        window.onclick = () => {
            setShow("display-none");
        }
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`/getAllNotificationByCandidate?candidateId=${user?.id}`).then((res) => {
            if(res.data.status === "SUCCESS") {
                setNotifications(res.data.data.listNotifications);
            }
        })
    }


    return (
        <div id='UserHeader'>
            <div className="header-container">
                <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                    <Container>
                        <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className='navlink hover-primary' href="/">About Us</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/enterprise-recruitment">Find Jobs</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/candidate-courses">Course</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/candidate-evaluation">Evaluation</Nav.Link>
                                {/* <Nav.Link className='navlink hover-primary' href="/candidate-contract">Contract</Nav.Link> */}
                                <Nav.Link className='navlink hover-primary' href="/candidate-view-assign">Assign</Nav.Link>
                            </Nav>
                            <Nav className='nav-right'>
                                <div className='navlink user-wrap' onClick={(e) => {
                                    e.stopPropagation();
                                    (show == "") ?
                                        setShow("display-none")
                                        : setShow("")
                                }}>
                                    <div className="flex-css relative hover-primary">
                                        <img className='avt' src={user?.image} alt="" />
                                        <div className='user-name'>{user?.name}</div>
                                    </div>
                                    <div className={`user-option ${show}`}>
                                        <div className="user-info">
                                            <img src={user?.image} alt="user-avt" className='user-info-avt' />
                                            <div className='block'>
                                                <span className='user-info-name'>{user?.name}</span>
                                                <span className='user-info-email'>{user?.email}</span>
                                            </div>
                                        </div>
                                        <Nav.Link href='/profile' className="dropdown-option" style={{ color: "var(--black-color)" }}>
                                            <FontAwesomeIcon icon={faAddressCard} className="icon" />
                                            Profile
                                        </Nav.Link>
                                        <div className="dropdown-option" onClick={logoutHandler}>
                                            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                            Sign out
                                        </div>
                                    </div>
                                </div>
                                <Notification/>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default CandidateHeader