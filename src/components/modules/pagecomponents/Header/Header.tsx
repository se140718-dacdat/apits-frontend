import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { User } from '../../../../model';
import Popup from '../Popup/Popup';
import "./Header.css";

interface Props {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>;
}

const Header: FC<Props> = (props) => {
    const [display, isDisplay] = useState<string>("");
    const [popup, isPopup] = useState<Number>(0);
    props.setUser({
        email: "dat@gmail.com",
        roleID: 2
    })
    useEffect(() => {
        window.onclick = function (event) {
            var modal = document.getElementById("Popup");
            if (event.target == modal) {
                isDisplay("");
                isPopup(0)
            }
        }
    })

    const displayHeader = () => {
        <div className="header-container">
            <Popup display={display} popup={popup} isDisplay={isDisplay} isPopup={isPopup} />
            <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                <Container>
                    <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='navlink' href="/">About Us</Nav.Link>
                        </Nav>
                        <Nav className='nav-right'>
                            <Nav.Link className='navlink' onClick={() => {
                                display == '' ?
                                    handleDisplay("display", 1) : handleDisplay("", 0);
                            }}>Login</Nav.Link>
                            <Nav.Link className='navlink' onClick={() => {
                                display == '' ?
                                    handleDisplay("display", 2) : handleDisplay("", 0);
                            }}>Apply as a Candidate</Nav.Link>
                            <button className='btn'>Hire Top IT</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    }

    const displayCandidateHeader = () => {
        <div className="header-container">
            <Popup display={display} popup={popup} isDisplay={isDisplay} isPopup={isPopup} />
            <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                <Container>
                    <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='navlink' href="/">About Us</Nav.Link>
                        </Nav>
                        <Nav className='nav-right'>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    }



    const handleDisplay = (display: string, popup: Number) => {
        isDisplay(display);
        isPopup(popup)
    }

    return (
        <div id='Header'>
            <div className="header-container">
                <Popup display={display} popup={popup} isDisplay={isDisplay} isPopup={isPopup} />
                <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                    <Container>
                        <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className='navlink' href="/">About Us</Nav.Link>
                            </Nav>
                            <Nav className='log'>
                                <Nav.Link className='navlink' onClick={() => {
                                    display == '' ?
                                        handleDisplay("display", 1) : handleDisplay("", 0);
                                }}>Login</Nav.Link>
                                <Nav.Link className='navlink' onClick={() => {
                                    display == '' ?
                                        handleDisplay("display", 2) : handleDisplay("", 0);
                                }}>Apply as a Candidate</Nav.Link>
                                <button className='btn'>Hire Top IT</button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default Header