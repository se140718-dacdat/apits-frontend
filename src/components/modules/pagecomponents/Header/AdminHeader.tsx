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
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';


interface Props {
    setUser: Dispatch<SetStateAction<User | null>>;
}
const AdminHeader: FC<Props> = (props) => {
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
                                <Nav.Link className='navlink hover-primary' href="/candidates-management">Candidate</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/enterprises-management">Enterprise</Nav.Link>
                                <Nav.Link className='navlink hover-primary' href="/employee-management">Employee</Nav.Link>
                            </Nav>
                            <Nav className='nav-right'>
                                <div className='navlink user-wrap' onClick={(e) => {
                                    e.stopPropagation();
                                    (show == "") ?
                                        setShow("display-none")
                                        : setShow("")
                                }}>
                                    <div className="flex-css relative hover-primary">
                                        <div className='user-name'>Admin</div>
                                    </div>
                                    <div className={`user-option ${show}`}>
                                        <div className="dropdown-option" onClick={logoutHandler}>
                                            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                            Sign out
                                        </div>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default AdminHeader;