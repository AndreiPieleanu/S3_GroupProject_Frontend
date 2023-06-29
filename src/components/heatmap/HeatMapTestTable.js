import { useEffect, useState } from "react";
import './heatmapPage.css';
import { Link, useParams } from "react-router-dom";
import { testCommands } from "../../redux/actionsAPI/apis/testApi";
import { Button, Container, Table } from "react-bootstrap";
import { testSetCommands } from "../../redux/actionsAPI/apis/testSetApi";
import HeatmapSubtestsTable from "./HeatmapSubtestsTable";
import { TestResultColors } from "../../utils/colorConstants";

export default function HeatMapTestTable(props) {
    const { branchId, commitId, testSetId, testId, subtestId } = useParams();
    const [totalNumberOfTestsInATestSetr, setTotalNumber] = useState(0);
    const [totalNumberOfPassedTestsInATestSetr, setTotalPassedNumber] = useState(0);
    const [percentagePassed, setPercentagePassed] = useState(0);
    const [selectedTestSet, setSelectedTestSet] = useState(null);

    const [testList, setTests] = useState({});
    const [testSubtestData, setTestSubtestData] = useState({});
    useEffect(() => {
        if (testSetId) {
            testCommands
                .getAllTestsOfTestSetWithId(testSetId)
                .then(response => {
                    setTests(response);
                })
                .catch(error => console.log(error));

            testSetCommands
                .getResultsForTestsOfTestSetWithId(testSetId)
                .then(results => {
                    setTestSubtestData(results);
                    setTotalNumber(Object.values(results).length);
                    setTotalPassedNumber(Object.values(results).filter(item => item === 1).length);
                    if(totalNumberOfTestsInATestSetr !== 0){
                        setPercentagePassed(totalNumberOfPassedTestsInATestSetr * 100.0 / totalNumberOfTestsInATestSetr);
                    }
                    console.log(testSubtestData);
                })
                .catch(error => console.log(error));

            testSetCommands.getParticularTestSet(testSetId)
            .then(response => setSelectedTestSet(response))
            .catch(error => console.log(error));
        }
    }, [branchId, commitId, testSetId, testId, subtestId]);

    const [selectedTestId, setTestId] = useState(0);

    return (
        <div>
            {
                testSetId ?
                    <div>
                        <div className="percent passed">
                            <h3>Test Set: <b>{selectedTestSet?.name}</b></h3>
                            <p>{totalNumberOfPassedTestsInATestSetr} tests passed out of {totalNumberOfTestsInATestSetr}</p>
                        </div>
                        <div className="hm-tests">
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60%' }}>Test Name</th>
                                            <th style={{ width: '20%' }}>Execution Time</th>
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
                                                        <td>
                                                            <Link className="tableLinks" to={`/heatmap/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${item.id}`}
                                                                onClick={() => setTestId(item.id)}>
                                                                {item.name}
                                                            </Link>
                                                        </td>
                                                        <td>{item.duration}</td>
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
                        <div className="hm-subtests">
                            <HeatmapSubtestsTable key={`test${selectedTestId}`} testId={selectedTestId} testSetId={props.testSetId} branchId={props.branchId} commitId={props.commitId} />
                        </div>
                        */}
                    </div> :
                    <div>Select a test set to see its tests</div>
            }
        </div>
    );
}