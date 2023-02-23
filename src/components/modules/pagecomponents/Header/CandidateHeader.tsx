import React, { FC, Dispatch, SetStateAction, useEffect } from 'react'
import { User } from '../../../../model';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../../redux/apiRequest';


interface Props {
    setUser: Dispatch<SetStateAction<User | null>>;
}
const CandidateHeader: FC<Props> = (props) => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = user?.token;
    const logoutHandler = () => {
        logoutUser(dispatch, navigate)
    }


    return (
        <div id='CandidateHeader'>
            <div className="header-container">
                <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                    <Container>
                        <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className='navlink' href="/">About Us</Nav.Link>
                            </Nav>
                            <Nav className='nav-right'>
                                <button className='btn' onClick={logoutHandler}>Logout</button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default CandidateHeader