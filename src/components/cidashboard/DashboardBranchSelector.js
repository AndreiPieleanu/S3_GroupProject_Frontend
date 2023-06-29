 import { useEffect, useState } from "react";
import { branchCommands } from "../../redux/actionsAPI/apis/branchApi";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Col, Container, ListGroup } from "react-bootstrap";
import TokenManager from "../../redux/AuthAPIs/TokenManager";

export default function DashboardBranchSelector(props) {
    const [displayList, setDisplayList] = useState({});

    const token = TokenManager.getAccessToken();
    const userId = TokenManager.getClaims()?.userId;
    const navigate = useNavigate();
    useEffect(() => {
        if (props.branchId) {
            branchCommands
                .getAllPublicBranchs()
                .then(response => setDisplayList(response))
                .catch(error => alert(error));
        }
        else {
            if (token) {
                branchCommands
                    .getAllBranchesOfUserWithId(userId, token)
                    .then(response => setDisplayList(response))
                    .catch(error => {
                        alert("Your session has expired! Login back!");
                        TokenManager.clear();
                        navigate('/');
                    });
            }
            else {
                branchCommands
                    .getAllPublicBranchs()
                    .then(response => setDisplayList(response))
                    .catch(error => alert(error));
            }
        }

    }, []);
    
    return (
            <Container>
                <Col className="d-flex justify-content-left"
                    style={{ display: "inline-block", width: "fit-content", borderRadius: '10px' }}>
                    <ListGroup as="ol" numbered>
                        {Object.values(displayList).map((item) => (
                            <div key={`branch${item.id}`}>
                                <Container>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">
                                                    <Link to={`/dashboard/branches/${item.id}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <Badge bg="primary">
                                                    ID: {item.id}
                                                </Badge>
                                                <Badge bg="secondary" style={{marginLeft: '3px'}}>
                                                    {item.user ? <div>🔒</div> : null}
                                                </Badge>
                                            </div>
                                        </ListGroup.Item>
                                </Container>
                            </div>
                        ))}
                    </ListGroup>
                </Col>
            </Container>
    );
}