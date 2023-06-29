import { useEffect, useState } from "react";
import "./heatmapPage.css";
import { branchCommands } from "../../redux/actionsAPI/apis/branchApi";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Col, Container, ListGroup } from "react-bootstrap";
import TokenManager from "../../redux/AuthAPIs/TokenManager";
import { useParams } from "react-router-dom";


export default function HeatmapBranchesSelector(props) {
    const [displayList, setDisplayList] = useState({});
    const [branchResults, setBranchResults] = useState(null);
    const { branchId, commitId, testSetId, testId, subtestId } = useParams();

    const token = TokenManager.getAccessToken();
    const userId = TokenManager.getClaims()?.userId;
    const navigate = useNavigate();

    const handleBranchName = (name) => {
        props.setSelectedBranchName(name);
    }

    useEffect(() => {
        if (token) {
            branchCommands
                .getAllBranchesOfUserWithId(userId, token)
                .then(response => setDisplayList(response))
                .catch(error => console.log(error));
            branchCommands.getBranchResultsAuthed().then(response => setBranchResults(response)).catch(error => console.log(error));
        }
        else {
            branchCommands
                .getAllPublicBranchs()
                .then(response => setDisplayList(response))
                .catch(error => alert(error));

            branchCommands.getBranchResults().then(response => setBranchResults(response)).catch(error => console.log(error));
        }
    }, []);

    return (
        <Container>
            <h3>Branches:</h3>
            <ul className="list-group mt-3" numbered>
                {displayList && Object.values(displayList)?.map((item) => (
                    <li key={`branch${item.id}`}
                        className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <Link className="tableLinks" to={`/heatmap/branches/${item.id}`} onClick={() => handleBranchName(item.name)}>
                                    {item.name}
                                </Link>
                            </div>
                            {branchResults?.[item.id] == 0 ? (
                                <Badge bg="danger">FAILED</Badge>
                            ) : (
                                <Badge bg="success">PASSED</Badge>
                            )}
                            {/*<Badge bg="primary">
                                    ID: {item.id}
                                </Badge>*/}
                            <Badge bg="secondary" style={{ marginLeft: '3px' }}>
                                {item.user ? <div>🔒</div> : null}
                            </Badge>
                        </div>
                    </li>
                ))}
                {!displayList ? (<div>Cannot load data. Check internet connection!</div>) : (<div></div>)}
            </ul>
        </Container>
    );
}