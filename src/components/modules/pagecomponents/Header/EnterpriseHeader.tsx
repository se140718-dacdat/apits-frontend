import { faAdd, faAddressCard, faBell, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../model';
import { logoutUser } from '../../../../redux/apiRequest';
import "./UserHeader.css";
import Notification from '../Popup/Notification/Notification';


interface Props {
    setUser: Dispatch<SetStateAction<User | null>>;
}
const EnterpriseHeader: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.user.user.user);
    const [show, setShow] = useState<string>("display-none");
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = account?.token;
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
                                <Nav.Link className='navlink hover-primary' href="/enterprise-recruitment">Post</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/request">Request</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/enterprise-interview">Interview</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/enterprise-contract">Contract</Nav.Link>
                            </Nav>
                            <Nav className='nav-right'>
                            <button className="navlink btn-add-post" onClick={()=>{navigate("/create-post")}}>
                                    <FontAwesomeIcon icon={faAdd} className="icon" />
                                    New Post
                                </button>
                                <FontAwesomeIcon icon={faBell} className="navlink align-self hover-primary icon" />
                                <div className='navlink user-wrap' onClick={(e) => {
                                    e.stopPropagation();
                                    (show == "") ?
                                        setShow("display-none")
                                        : setShow("")
                                }}>
                                    <div className="flex-css relative hover-primary">
                                        <div className='user-name' style={{marginRight: "8px"}}>{account?.information.name}</div>
                                        <img className='avt' src={user?.image} alt="" />
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                    <div className={`user-option ${show}`}>
                                        <div className="user-info">
                                            <img src={user?.image} alt="user-avt" className='user-info-avt' />
                                            <div className='block'>
                                                <span className='user-info-name'>{account?.information.name}</span>
                                                <span className='user-info-email'>{account?.information.email}</span>
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
                                <Notification />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default EnterpriseHeader