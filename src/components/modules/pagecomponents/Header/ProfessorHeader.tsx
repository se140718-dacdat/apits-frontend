import { Container, Nav, Navbar } from "react-bootstrap";
import "./RolesHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";


const ProfessorHeader: FC<any> = (props) => {
    const {user} = props;
    return ( 
        <div id='RolesHeader'>
        <div className="header-container">
            <Navbar collapseOnSelect expand="lg" bg="light" className='navbar'>
                <Container>
                    <Navbar.Brand href="/"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                                <Nav.Link className='navlink' href="/">About Us</Nav.Link>
                            </Nav>
                        <Nav className="nav-right">
                            <Nav.Link className='navlink' href="/course">Course</Nav.Link>
                            <Nav.Link className='navlink' href="/interview">Interview</Nav.Link>
                            <Nav.Link className='navlink' href="/profile">Profile</Nav.Link>
                            <Nav.Link className='navbar' >
                                <div className="avatar">
                                    <img src="/images/avt.jpg" alt="Avatar" />
                                </div>
                            </Nav.Link>
                            <Nav.Link className='navbar' >                                
                                <span>{user.name}</span>
                            </Nav.Link>
                            <Nav.Link className='navlink' >
                                <FontAwesomeIcon icon={faBell} className="icon" />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    </div>
     );
}
 
export default ProfessorHeader;