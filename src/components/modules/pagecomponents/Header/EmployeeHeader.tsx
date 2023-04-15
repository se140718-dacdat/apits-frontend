import { faAddressCard, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Container, Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../model';
import { logoutUser } from '../../../../redux/apiRequest';
import "./UserHeader.css";

interface Props {
    setUser: Dispatch<SetStateAction<User | null>>;
    position: string;
}


const EmployeeHeader: FC<Props> = (props) => {
    const [show, setShow] = useState<string>("display-none");
    const user = useSelector((state: any) => state.user.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.onclick = () => {
            setShow("display-none");
        }
    }, [])

    const logoutHandler = () => {
        logoutUser(dispatch, navigate)
    }


    const renderHandle = () => {
        switch (props.position) {
            case "MANAGER":
                return (
                    <Nav className="me-auto">
                        <Nav.Link className='navlink hover-primary' href="/">About Us</Nav.Link>
                        <Nav.Link className='navlink hover-primary' href="/interview">Interview</Nav.Link>
                        {/* <Nav.Link className='navlink hover-primary' href="/specialty">Specialty</Nav.Link> */}
                        <Nav.Link className='navlink hover-primary' href="/candidates">Candidate</Nav.Link>
                    </Nav>
                )
            case "HR":
                return (
                    <Nav className="me-auto">
                        <Nav.Link className='navlink hover-primary' href="/">About Us</Nav.Link>
                        <Nav.Link className='navlink hover-primary' href="/employee-recruitment">Post</Nav.Link>
                        <Nav.Link className='navlink hover-primary' href="/candidates">Candidate</Nav.Link>
                        <Nav.Link className='navlink hover-primary' href="/enterprises">Enterprise</Nav.Link>
                        <Nav.Link className='navlink hover-primary' href="/contract">Contract</Nav.Link>
                    </Nav>
                )
            case "PROFESSOR":
                return (
                    <Nav className="me-auto">
                        <Nav.Link className='navlink hover-primary' href="/">About Us</Nav.Link>
                        <Nav.Link className='navlink hover-primary' href="/professor-interview">Interview</Nav.Link>
                        <Nav.Link className='navlink hover-primary' href="/specialty">Course</Nav.Link>
                    </Nav>
                )
            default:
                break;
        }
    }
    return (
        <div id='UserHeader'>
            <div className="header-container">
                <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                    <Container>
                        <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            {renderHandle()}
                            <Nav className='nav-right'>
                                <div className='navlink user-wrap' onClick={(e) => {
                                    e.stopPropagation();
                                    (show == "") ?
                                        setShow("display-none")
                                        : setShow("")
                                }}>
                                    <div className="flex-css relative hover-primary">
                                        <div className='user-name'>{user?.employeeName}</div>
                                    </div>
                                    <div className={`user-option ${show}`}>
                                        <div className="user-info">
                                            <div className='block'>
                                                <span className='user-info-name'>{user?.employeeName}</span>
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

export default EmployeeHeader