import React, { FC } from 'react'
import "./LandingPage.css"
import Login from "../Login/Login"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const LandingPage: FC = () => {
    return (
        <div id="LandingPage">
            <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                <Container>
                    <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='navlink' href="#features">About Us</Nav.Link>
                        </Nav>
                        <Nav className='log'>
                            <Nav.Link className='navlink' href="#">Login</Nav.Link>
                            <Nav.Link className='navlink' href="#">Apply as a Candidate</Nav.Link>
                            <button className='btn'>Hire Top IT</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login />
        </div>

    )
}

export default LandingPage;
