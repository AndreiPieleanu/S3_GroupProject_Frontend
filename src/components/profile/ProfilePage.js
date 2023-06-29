import './profilePage.css';
import profilePic from '../../images/user-profile-image.PNG';
import { Container, Row, Col, Image, ListGroup, Button, Badge, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import UserAPI from '../../redux/AuthAPIs/UserAPI';
import TokenManager from '../../redux/AuthAPIs/TokenManager';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { branchCommands } from '../../redux/actionsAPI/apis/branchApi';
import { Link, useNavigate } from 'react-router-dom';
import { commitCommands } from '../../redux/actionsAPI/apis/commitApi';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await UserAPI.getUser(TokenManager.getClaims()?.userId);
                setUser(userData);
                console.log(userData);
                const branches = await branchCommands.getAllBranchesOfUserWithId(userId, token);
                setBranches(branches);
                const commitsPosts = await commitCommands.getAllCommitsPostedByUserWithId(userId, token);
                setAllCommits(commitsPosts);
            } catch (error) {
                alert("Your session has expired! Login back!");
                TokenManager.clear();
                navigate("/");
                window.location.reload();
                return;
            }
        };

        if (TokenManager.getClaims()) {
            fetchUser();
        }
    }, []);

    const token = TokenManager.getAccessToken();
    const userId = TokenManager.getClaims()?.userId;
    const [branches, setBranches] = useState({});
    const [allCommits, setAllCommits] = useState({});
    const navigate = useNavigate();
    // useEffect(() => {
    //     branchCommands
    //         .getAllBranchesOfUserWithId(userId, token)
    //         .then(response => setBranches(response))
    //         .catch(error => console.log(error));
    //     commitCommands
    //         .getAllCommitsPostedByUserWithId(userId, token)
    //         .then(response => setAllCommits(response))
    //         .catch(error => console.log(error));
    // }, []);

    const [showAllCommits, setShowAllCommits] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    if (user !== null)
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={6} className="text-center">
                        <Image src={profilePic} alt="User Profile" className="user-image" roundedCircle />
                        <h2>{user?.foundUser.username}</h2>
                        <p>{user?.foundUser.email}</p>
                        <div className="social-icons">
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                <Button variant="light" className="social-icon">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </Button>
                            </a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                                <Button variant="light" className="social-icon">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </Button>
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                                <Button variant="light" className="social-icon">
                                    <FontAwesomeIcon icon={faGithub} />
                                </Button>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={6} className="text-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>Your activity</h3>
                            <Button variant="none" style={{color: '#0070fc'}} className="tableLinks" onClick={() => setShowAllCommits(!showAllCommits)}>
                                {showAllCommits ? 'View less' : 'View all'}
                            </Button>
                        </div>
                        <Form.Group controlId="search">
                            <Form.Control type="text" value={searchTerm} placeholder="Search by commit name or version" onChange={handleSearch} />
                        </Form.Group>
                        <div className="activity-list scroller">
                            <ListGroup>
                                {Object.values(allCommits)
                                    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                                    .filter(item => {
                                        if (searchTerm !== null && searchTerm !== undefined && searchTerm !== "") {
                                            return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.version.toLowerCase().includes(searchTerm.toLowerCase());
                                        } else {
                                            return true;
                                        }
                                    })
                                    .slice(0, showAllCommits ? undefined : 5)
                                    .map(item => (
                                        <ListGroup.Item key={item.version}>
                                            <Link className="tableLinks" to={`/heatmap/branches/${item.originBranch.id}/commits/${item.id}`}>
                                                {item.name}
                                            </Link>
                                            <br />
                                            <Badge bg="secondary" style={{ marginLeft: '3px' }}>
                                                Version: {item.version}
                                            </Badge>
                                        </ListGroup.Item>
                                    ))}
                            </ListGroup>
                        </div>
                    </Col>
                    <Col xs={6} className="text-center">
                        <h3>Your branches</h3>
                        <ListGroup>
                            {
                                Object.values(branches).map(item => {
                                    return (
                                        <ListGroup.Item key={item.id}>
                                            <Link className="tableLinks" to={`/heatmap/branches/${item.id}`}>
                                                {item.name}
                                            </Link>
                                            <Badge bg="secondary" style={{ marginLeft: '3px' }}>
                                                {item.user ? <div>🔒</div> : null}
                                            </Badge>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    else
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={6} className="text-center">
                        <h2>You are not logged in!</h2>
                    </Col>
                </Row>
            </Container>
        );
}