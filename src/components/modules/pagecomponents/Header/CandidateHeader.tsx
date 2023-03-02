import React, { FC, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { User } from '../../../../model';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../../redux/apiRequest';
import "./UserHeader.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faRightFromBracket, faBell } from '@fortawesome/free-solid-svg-icons'


interface Props {
    setUser: Dispatch<SetStateAction<User | null>>;
}
const CandidateHeader: FC<Props> = (props) => {
    const [show, setShow] = useState<string>("display-none");
    const user = useSelector((state: any) => state.auth.login.currentUser);
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
                                <Nav.Link className='navlink hover-primary' href="/">Find Jobs</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/">Course</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/">Inteview</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/">Contract</Nav.Link>

                            </Nav>
                            <Nav className='nav-right'>
                                <Nav.Link className='navlink user-wrap' onClick={(e) => {
                                    e.stopPropagation();
                                    (show == "") ?
                                        setShow("display-none")
                                        : setShow("")
                                }}>
                                    <div className="flex-css relative hover-primary">
                                        <img className='avt' src="/images/avt.jpg" alt="" />
                                        <div className='user-name'>Dac Dat</div>
                                    </div>
                                    <div className={`user-option ${show}`}>
                                        <div className="user-info">
                                            <img src="/images/avt.jpg" alt="user-avt" className='user-info-avt' />
                                            <div className='block'>
                                                <span className='user-info-name'>Dac Dat</span>
                                                <span className='user-info-email'>lhdd159357@gmail.com</span>
                                            </div>
                                        </div>
                                        <div className="dropdown-option">
                                            <FontAwesomeIcon icon={faAddressCard} className="icon" />
                                            Profile
                                        </div>
                                        <div className="dropdown-option">
                                            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                            Sign out
                                        </div>
                                    </div>
                                </Nav.Link>
                                <FontAwesomeIcon icon={faBell} className="navlink align-self hover-primary icon" />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default CandidateHeader