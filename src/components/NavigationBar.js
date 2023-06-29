import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png'
import { Image, Modal, Button } from "react-bootstrap";
import UserAPI from '../redux/AuthAPIs/UserAPI';
import TokenManager from '../redux/AuthAPIs/TokenManager';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./NavCustomStyle.css";
import ROUTES from '../utils/Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false);}
    const handleShow = () => {setShow(true);}

    let navigate = useNavigate();

    let loginLogoutIcon;
    let loginLogoutLink;
    let loginLogoutText;

    const handleDelete = () => {
        TokenManager.clear();
        navigate("/reportLibrary");
        window.location.reload();
      };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await UserAPI.getUser(TokenManager.getClaims()?.userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (TokenManager.getClaims()) {
            fetchUser();
        }
    }, []);

    const loggedInNavBar = () => {
        if (user !== null) {
            console.log(user);
            return (
                <NavLink exact className="nav-link-custom" activeClassName="active" to={ROUTES.PROFILE}>
                    <FontAwesomeIcon icon={faUser} /> {user.foundUser.username}
                </NavLink>
            );
        }
        return null;
    };

    if (localStorage.getItem("CPP_token")) {
        loginLogoutIcon = faSignOutAlt;
        loginLogoutLink = "/logout";
        loginLogoutText = "Logout"
    }
    else {
        loginLogoutIcon = faSignInAlt;
        loginLogoutLink = "/login";
        loginLogoutText = "Login"
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logging out..</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                    Confirm Logout
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/reportLibrary">
                        <Image id="logo" src={Logo} width={150} height={75} alt="Canon Technologies" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink exact id="first-link" className="nav-link-custom" activeClassName="active" to="/reportLibrary">Report Library</NavLink>
                            <NavLink exact className="nav-link-custom" activeClassName="active" to="/heatmap">Heatmap</NavLink>
                            {/* <NavLink exact className="nav-link-custom" activeClassName="active" to="/dashboard">CI Dashboard</NavLink> */}
                            <NavLink exact className="nav-link-custom" activeClassName="active" to="/error-history">Error History</NavLink>
                        </Nav>
                        {loggedInNavBar()}
                        <Nav>
                            {loginLogoutLink === "/logout" ? (

                            <NavLink exact className="nav-link-custom" activeClassName="active" onClick={handleShow} to="">
                                {loginLogoutText} <FontAwesomeIcon icon={loginLogoutIcon} />
                            </NavLink>

                            ) : (
                            
                            <NavLink exact className="nav-link-custom" activeClassName="active" to={loginLogoutLink}>
                                {loginLogoutText} <FontAwesomeIcon icon={loginLogoutIcon} />
                            </NavLink>)}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default NavigationBar;