import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { testCommands } from "../../redux/actionsAPI/apis/testApi";
import { Button, Container, Table } from "react-bootstrap";
import { testSetCommands } from "../../redux/actionsAPI/apis/testSetApi";
import { TestResultColors } from "../../utils/colorConstants";
import DashboardSubtestsTable from "./DashboardSubtestsTable";
import SmallPiechart from "./SmallPiechart";

export default function DashboardTestTable(props) {
    const [totalNumberOfTestsInATestSetr, setTotalNumber] = useState(0);
    const [totalNumberOfPassedTestsInATestSetr, setTotalPassedNumber] = useState(0);
    const [percentagePassed, setPercentagePassed] = useState(0);

    const [testList, setTests] = useState({});
    const [testSubtestData, setTestSubtestData] = useState({});
    const [piechartData, setPiechartData] = useState([]);
    useEffect(() => {
        if (props.testSetId) {
            testCommands
                .getAllTestsOfTestSetWithId(props.testSetId)
                .then(response => {
                    setTests(response);
                })
                .catch(error => alert(error));

            testSetCommands
                .getResultsForTestsOfTestSetWithId(props.testSetId)
                .then(results => {
                    setTestSubtestData(results);
                    setTotalNumber(Object.values(results).length);
                    setTotalPassedNumber(Object.values(results).filter(item => item === 1).length);
                    console.log(testSubtestData);
                })
                .catch(error => alert(error));
        }
    }, [props.testSetId]);
    useEffect(() => {
        if(totalNumberOfTestsInATestSetr > 0){
            const data = 
            [
                { title: 'Passed', value: totalNumberOfPassedTestsInATestSetr, color: TestResultColors[1] },
                { title: 'Failed', value: totalNumberOfTestsInATestSetr - totalNumberOfPassedTestsInATestSetr, color: TestResultColors[2] }
            ];
            setPiechartData(data);
            setPercentagePassed(totalNumberOfPassedTestsInATestSetr * 100.0 / totalNumberOfTestsInATestSetr);
        }
    }, [totalNumberOfPassedTestsInATestSetr, totalNumberOfTestsInATestSetr]);

    const [selectedTestId, setTestId] = useState(0);

    return (
        <div>
            <br></br>
            {
                props.testSetId ?
                    <div>
                        <div className="percent passed">
                            <h3>Tests for Test Set with Id {props.testSetId}:</h3>
                            <p>{totalNumberOfPassedTestsInATestSetr} tests passed out of {totalNumberOfTestsInATestSetr}</p>
                            <SmallPiechart dataToDisplay={piechartData}/>
                        </div>
                        <div className="db-tests">
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}>Test Id</th>
                                            <th style={{ width: '70%' }}>Name</th>
                                            <th style={{ width: '20%' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.values(testList).map(item => {
                                                const tdStyle = {
                                                    backgroundColor: testSubtestData[item.id] === 1 ? TestResultColors[1] : TestResultColors[2]
                                                };
                                                return (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <Link to={`/dashboard/branches/${props.branchId}/commits/${props.commitId}/test-sets/${props.testSetId}/test/${item.id}`}
                                                                onClick={() => setTestId(item.id)}>
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
                        <div className="db-subtests">
                            <DashboardSubtestsTable key={`test${selectedTestId}`} testId={selectedTestId} testSetId={props.testSetId} branchId={props.branchId} commitId={props.commitId} />
                        </div>
                    </div> :
                    <div>Select a test set to see its tests</div>
            }
        </div>
    );
}