import { useEffect, useState } from "react";
import { subtestCommands } from "../../redux/actionsAPI/apis/subtestApi";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TestResultColors } from "../../utils/colorConstants";
import { testCommands } from "../../redux/actionsAPI/apis/testApi";
import DashboardTestStepsTable from "./DashboardTestStepsTable";
import SmallPiechart from "./SmallPiechart";

export default function DashboardSubtestsTable(props) {
    const [totalNumberOfTestsInATestSetr, setTotalNumber] = useState(0);
    const [totalNumberOfPassedTestsInATestSetr, setTotalPassedNumber] = useState(0);
    const [percentagePassed, setPercentagePassed] = useState(0);

    const [subtestList, setSubtests] = useState({});
    const [testSubtestData, setTestSubtestData] = useState({});
    const [piechartData, setPiechartData] = useState([]);
    useEffect(() => {
        if (props.testId) {
            subtestCommands
                .getAllSubtestsOfTestWithId(props.testId)
                .then(response => {
                    setSubtests(response);
                })
                .catch(error => alert(error));

            testCommands
                .getResultsForSubtestsOfTestWithId(props.testId)
                .then(response => {
                    setTestSubtestData(response);
                    setTotalNumber(Object.values(response).length);
                    setTotalPassedNumber(Object.values(response).filter(item => item === 1).length);
                })
                .catch(error => alert(error));
        }
    }, [props.testId]);
    useEffect(() => {
        if (totalNumberOfTestsInATestSetr > 0) {
            const data =
                [
                    { title: 'Passed', value: totalNumberOfPassedTestsInATestSetr, color: TestResultColors[1] },
                    { title: 'Failed', value: totalNumberOfTestsInATestSetr - totalNumberOfPassedTestsInATestSetr, color: TestResultColors[2] }
                ];
            setPiechartData(data);
            setPercentagePassed(totalNumberOfPassedTestsInATestSetr * 100.0 / totalNumberOfTestsInATestSetr);
        }
    }, [totalNumberOfPassedTestsInATestSetr, totalNumberOfTestsInATestSetr]);

    const navigate = useNavigate();
    const [selectedSubtestId, setSubtestId] = useState(0);

    return (
        <div>
            <br></br>
            {
                props.testId ?
                    <div>
                        <div className="percent passed">
                            <h3>Subtests for Test with Id {props.testId}:</h3>
                            <p>{totalNumberOfPassedTestsInATestSetr} subtests passed out of {totalNumberOfTestsInATestSetr}</p>
                            <SmallPiechart dataToDisplay={piechartData} />
                        </div>
                        <div className="db-subtests">
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}>Subtest Id</th>
                                            <th style={{ width: '70%' }}>Name</th>
                                            <th style={{ width: '20%' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.values(subtestList).map(item => {
                                                const tdStyle = {
                                                    backgroundColor: testSubtestData[item.id] === 1 ? TestResultColors[1] : TestResultColors[2]
                                                };
                                                return (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <Link to={`/dashboard/branches/${props.branchId}/commits/${props.commitId}/test-sets/${props.testSetId}/test/${props.testId}/subtest/${item.id}`}
                                                                onClick={() => setSubtestId(item.id)}>
                                                                {item.name}
                                                            </Link>
                                                        </td>
                                                        <td style={tdStyle}></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </div>
                        <div className="db-teststeps">
                            <DashboardTestStepsTable key={`subtest${selectedSubtestId}`} subtestId={selectedSubtestId} testId={props.testId} testSetId={props.testSetId} branchId={props.branchId} commitId={props.commitId} />
                        </div>

                    </div> :
                    <div>Select a test to see its subtests</div>
            }
        </div>
    );
}