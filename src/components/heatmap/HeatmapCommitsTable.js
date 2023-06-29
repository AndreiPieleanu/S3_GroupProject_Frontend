import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './heatmapPage.css';
import { commitCommands } from "../../redux/actionsAPI/apis/commitApi";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HeatMapTestSetsTable from "./HeatMapTestSetsTable";
import { branchCommands } from "../../redux/actionsAPI/apis/branchApi";
import { TestResultColors } from "../../utils/colorConstants";

export default function HeatmapCommitsTable(props) {
    const [commitsList, setCommits] = useState({});
    const [selectedBranch, setSelectedBranch] = useState(null)
    const { branchId, commitId, testSetId, testId, subtestId } = useParams();
    const [commitResults, setCommitResults] = useState({});

    const [totalNumberOfCommitsInBranch, setTotalNumber] = useState(0);
    const [totalNumberOfPassedCommitsInBranch, setTotalPassedNumber] = useState(0);

    const fetchData = async () => {
        await commitCommands
            .getAllCommitsOfBranchWithId(branchId)
            .then(response => setCommits(response))
            .then(console.log(commitsList))
            .catch(error => console.log(error));

        await branchCommands
            .getBranch(branchId)
            .then(response => setSelectedBranch(response))
            .catch(error => console.log(error));

        await commitCommands
            .getAllCommitsResultsOfBranchWithId(branchId)
            .then(response => {
                setCommitResults(response);
                setTotalNumber(Object.values(response).length);
                setTotalPassedNumber(Object.values(response).filter(item => item === 1).length);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchData();

    }, [branchId, commitId, testSetId, testId, subtestId]);

    const navigate = useNavigate();
    const [selectedCommitId, setCommitId] = useState(0);

    return (
        <div>
            {
                branchId ?
                    <div>
                        <div className="hm-commits">
                            <h3>Branch: <b>{selectedBranch?.name}</b></h3>
                            <p>{totalNumberOfPassedCommitsInBranch} commits passed out of {totalNumberOfCommitsInBranch}</p>
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%' }}>Version</th>
                                            <th style={{ width: '75%' }}>Commit Name</th>
                                            <th style={{ width: '20%' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.values(commitsList).map(item => {
                                                const tdStyle = {
                                                    backgroundColor: commitResults[item.id] === 1 ? TestResultColors[1] : TestResultColors[2]
                                                };
                                                return (
                                                    <tr>
                                                        <td>{item.version}</td>
                                                        <td><Link className="tableLinks" to={`/heatmap/branches/${branchId}/commits/${item.id}`}>{item.name}</Link></td>
                                                        <td style={tdStyle} />
                                                        {/* to={`/heatmap/branches/${props.branchId}/commits/${item.id}`} */}
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </div>
                        {/*
                        <div className="hm-testsets">
                            <HeatMapTestSetsTable key={`commit${selectedCommitId}`} branchId={props.branchId} commitId={selectedCommitId} />
                        </div>
                        */}
                    </div> :
                    <div>Select a branch to see its commits</div>
            }
        </div>
    );
}