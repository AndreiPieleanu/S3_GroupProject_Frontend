import { useEffect, useState } from "react";
import { commitCommands } from "../../redux/actionsAPI/apis/commitApi";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DashboardTestSetsTable from "./DashboardTestSetsTable";

export default function DashboardCommitsTable(props) {
    const [commitsList, setCommits] = useState({});
    useEffect(() => {
        commitCommands
            .getAllCommitsOfBranchWithId(props.branchId)
            .then(response => setCommits(response))
            .catch(error => alert(error));
    }, [props.branchId]);

    const navigate = useNavigate();
    const [selectedCommitId, setCommitId] = useState(0);
    return (
        <div>
            {
                props.branchId ?
                    <div>
                        <div className="db-commits">
                            <h3>Commits for Branch with Id {props.branchId}: </h3>
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%' }}>Commit Id</th>
                                            <th style={{ width: '95%' }}>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.values(commitsList).map(item => {
                                                return (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td><Link to={`/dashboard/branches/${props.branchId}/commits/${item.id}`} onClick={() => setCommitId(item.id)}>{item.name}</Link></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </div>
                        <div className="db-testsets">
                            <DashboardTestSetsTable key={`commit${selectedCommitId}`} branchId={props.branchId} commitId={selectedCommitId} />
                        </div>
                    </div> :
                    <div>Select a branch to see its commits</div>
            }
        </div>
    );
}