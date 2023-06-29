import { useEffect, useState } from "react";
import { testSetCommands } from "../../redux/actionsAPI/apis/testSetApi";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { commitCommands } from "../../redux/actionsAPI/apis/commitApi";
import { TestResultColors } from "../../utils/colorConstants";
import DashboardTestTable from "./DashboardTestTable";
import SmallPiechart from "./SmallPiechart";

export default function DashboardTestSetsTable(props) {

    const [testSetList, setTestSets] = useState({});
    const [testSetResults, setTestSetResults] = useState({});
    const [totalNumberOfTestSetsInCommit, setTotalNumber] = useState(0);
    const [totalNumberOfPassedTestSetsInCommit, setTotalPassedNumber] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [piechartData, setPiechartData] = useState([]);

    useEffect(() => {
        testSetCommands
            .getAllTestSetsOfCommitWithId(props.commitId)
            .then(response => setTestSets(response))
            .catch(error => alert(error));

        commitCommands
            .getTestSetsResultsOfCommitWithId(props.commitId)
            .then(response => {
                setTestSetResults(response);
                setTotalNumber(Object.values(response).length);
                setTotalPassedNumber(Object.values(response).filter(item => item === 1).length);
            })
            .catch(error => alert(error));
    }, [props.commitId]);
    useEffect(() => {
        if(totalNumberOfPassedTestSetsInCommit > 0){
            const data = 
            [
                { title: 'Passed', value: totalNumberOfPassedTestSetsInCommit, color: TestResultColors[1] },
                { title: 'Failed', value: totalNumberOfTestSetsInCommit - totalNumberOfPassedTestSetsInCommit, color: TestResultColors[2] }
            ];
            setPiechartData(data);
            setPercentage(totalNumberOfTestSetsInCommit * 100.0 / totalNumberOfPassedTestSetsInCommit);
        }
    }, [totalNumberOfPassedTestSetsInCommit, totalNumberOfTestSetsInCommit]);

    const navigate = useNavigate();
    const [selectedTestSetId, setTestSetId] = useState(0);
    return (
        <div>
            <br></br>
            {
                props.commitId ?
                    <div>
                        <div className="db-testsets">
                            <h3>Test Sets for Commit with Id {props.commitId}:</h3>
                            <p>{totalNumberOfPassedTestSetsInCommit} test sets passed out of {totalNumberOfTestSetsInCommit}</p>
                            <SmallPiechart dataToDisplay={piechartData}/>
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}>Test set Id</th>
                                            <th style={{ width: '70%' }}>Name</th>
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
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <Link to={`/dashboard/branches/${props.branchId}/commits/${props.commitId}/test-sets/${item.id}`}
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
                        <div className="db-tests">
                            <DashboardTestTable key={`testset${selectedTestSetId}`} testSetId={selectedTestSetId} branchId={props.branchId} commitId={props.commitId} />
                        </div>
                    </div> :
                    <div>Select a commit to see the its test sets</div>
            }
        </div>
    );
}