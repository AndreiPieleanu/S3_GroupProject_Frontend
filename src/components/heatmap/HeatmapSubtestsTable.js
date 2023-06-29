import { useEffect, useState } from "react";
import "./heatmapPage.css";
import { subtestCommands } from "../../redux/actionsAPI/apis/subtestApi";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeatMapTestSetsTable from "./HeatMapTestSetsTable";
import HeatMapTestStepsTable from "./HeatmapTestStepsTable";
import { TestResultColors } from "../../utils/colorConstants";
import { testCommands } from "../../redux/actionsAPI/apis/testApi";

export default function HeatmapSubtestsTable(props) {
    const { branchId, commitId, testSetId, testId, subtestId } = useParams();
    const [totalNumberOfTestsInATestSetr, setTotalNumber] = useState(0);
    const [totalNumberOfPassedTestsInATestSetr, setTotalPassedNumber] = useState(0);
    const [percentagePassed, setPercentagePassed] = useState(0);
    const [selectedTest, setSelectedTest] = useState(null);

    const [subtestList, setSubtests] = useState({});
    const [testSubtestData, setTestSubtestData] = useState({});
    useEffect(() => {
        if (testId) {
            subtestCommands
                .getAllSubtestsOfTestWithId(testId)
                .then(response => {
                    setSubtests(response);
                })
                .catch(error => console.log(error));

            testCommands
                .getResultsForSubtestsOfTestWithId(testId)
                .then(response => {
                    setTestSubtestData(response);
                    setTotalNumber(Object.values(response).length);
                    setTotalPassedNumber(Object.values(response).filter(item => item === 1).length);
                    if(totalNumberOfTestsInATestSetr !== 0){
                        setPercentagePassed(totalNumberOfPassedTestsInATestSetr * 100.0 / totalNumberOfTestsInATestSetr);
                    }
                })
                .catch(error => console.log(error));
            
            testCommands.getParticularTest(testId)
            .then(response => setSelectedTest(response))
            .catch(error => console.log(error));
        }
    }, [branchId, commitId, testSetId, testId, subtestId]);

    const navigate = useNavigate();
    const [selectedSubtestId, setSubtestId] = useState(0);

    return (
        <div>
            {
                testId ?
                    <div>
                        <div className="percent passed">
                            <h3>Test: <b>{selectedTest?.name}</b></h3>
                            <p>{totalNumberOfPassedTestsInATestSetr} subtests passed out of {totalNumberOfTestsInATestSetr}</p>
                        </div>
                        <div className="hm-subtests">
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '80%' }}>Subtest Name</th>
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
                                                        <td>
                                                            <Link className="tableLinks" to={`/heatmap/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${testId}/subtest/${item.id}`}
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
                        {/*
                        <div className="hm-teststeps">
                            <HeatMapTestStepsTable key={`subtest${selectedSubtestId}`} subtestId={selectedSubtestId} testId={props.testId} testSetId={props.testSetId} branchId={props.branchId} commitId={props.commitId} />
                        </div>
                        */}
                    </div> :
                    <div>Select a test to see its subtests</div>
            }
        </div>
    );
}