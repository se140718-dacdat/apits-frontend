import { faAddressCard, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../model';
import { logoutUser } from '../../../../redux/apiRequest';
import "./UserHeader.css";


interface Props {
    setUser: Dispatch<SetStateAction<User | null>>;
}
const CandidateHeader: FC<Props> = (props) => {
    const [show, setShow] = useState<string>("display-none");
    const user = useSelector((state: any) => state.user.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = user?.token;
    const logoutHandler = () => {
        logoutUser(dispatch, navigate)
    }

    useEffect(() => {
        window.onclick = () => {
            setShow("display-none");
        }
    }, [])


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
                                <Nav.Link className='navlink hover-primary' href="/interview">Inteview</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/">Contract</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/candidate-notification">Notification</Nav.Link>
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
                                <OverlayTrigger
                                    trigger="click"
                                    key={'bottom'}
                                    placement={'bottom'}
                                    overlay={
                                        <Popover id={`popover-positioned-bottom`} className='notification-popup-cover'>
                                            <Popover.Header as="h3">{`Notifications`} <a className='see-all' href='/notification'>See all</a></Popover.Header>
                                            <Popover.Body>
                                                <div className='notification-popup-item'>
                                                    <strong>You have Assigned!</strong>
                                                    <br></br>
                                                    <span>We assign you to FPT Software Company</span>
                                                </div>
                                                <div className='notification-popup-item'>
                                                    <strong>You have Assigned!</strong>
                                                    <br></br>
                                                    <span>We assign you to FPT Software Company</span>
                                                </div>
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <FontAwesomeIcon icon={faBell} className="navlink align-self hover-primary icon" />
                                </OverlayTrigger>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default CandidateHeader