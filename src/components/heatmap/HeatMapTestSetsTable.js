import { useEffect, useState } from "react";
import './heatmapPage.css';
import { testSetCommands } from "../../redux/actionsAPI/apis/testSetApi";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeatMapTestTable from "./HeatMapTestTable";
import { commitCommands } from "../../redux/actionsAPI/apis/commitApi";
import { TestResultColors } from "../../utils/colorConstants";

export default function HeatMapTestSetsTable(props) {

    const { branchId, commitId, testSetId, testId, subtestId } = useParams();
    const [testSetList, setTestSets] = useState({});
    const [testSetResults, setTestSetResults] = useState({});
    const [totalNumberOfTestSetsInCommit, setTotalNumber] = useState(0);
    const [totalNumberOfPassedTestSetsInCommit, setTotalPassedNumber] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [selectedCommit, setSelectedCommit] = useState(null);

    useEffect(() => {
        testSetCommands
            .getAllTestSetsOfCommitWithId(commitId)
            .then(response => setTestSets(response))
            .catch(error => console.log(error));

        commitCommands
            .getTestSetsResultsOfCommitWithId(commitId)
            .then(response => {
                setTestSetResults(response);
                setTotalNumber(Object.values(response).length);
                setTotalPassedNumber(Object.values(response).filter(item => item === 1).length);
                if(totalNumberOfPassedTestSetsInCommit !== 0){
                    setPercentage(totalNumberOfTestSetsInCommit * 100.0 / totalNumberOfPassedTestSetsInCommit);
                }
            })
            .catch(error => console.log(error));

            commitCommands.getParticularCommit(commitId)
            .then(response => setSelectedCommit(response))
            .catch(error => console.log(error));

    }, [branchId, commitId, testSetId, testId, subtestId]);

    const navigate = useNavigate();
    const [selectedTestSetId, setTestSetId] = useState(0);
    return (
        <div>
            {
                commitId ?
                    <div>
                        <div className="hm-testsets">
                            <h3>Commit: <b>{selectedCommit?.name}</b></h3>
                            <p>{totalNumberOfPassedTestSetsInCommit} test sets passed out of {totalNumberOfTestSetsInCommit}</p>
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '80%' }}>Test Set Name</th>
                                            <th style={{ width: '20%' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.values(testSetList).map(item => {
                                                const tdStyle = {
                                                    backgroundColor: testSetResults[item.id] === 1 ? TestResultColors[1] : TestResultColors[2]
                                                };
                                                return (
                                                    <tr>
                                                        <td>
                                                            <Link className="tableLinks" to={`/heatmap/branches/${branchId}/commits/${commitId}/test-sets/${item.id}`}
                                                                onClick={() => setTestSetId(item.id)}>
                                                                {item.name}
                                                            </Link>
                                                        </td>
                                                        <td style={tdStyle} />
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </div>
                        {/*
                        <div className="hm-tests">
                            <HeatMapTestTable key={`testset${selectedTestSetId}`} testSetId={selectedTestSetId} branchId={props.branchId} commitId={props.commitId} />
                        </div>
                        */}
                    </div> :
                    <div>Select a commit to see the its test sets</div>
            }
        </div>
    );
}