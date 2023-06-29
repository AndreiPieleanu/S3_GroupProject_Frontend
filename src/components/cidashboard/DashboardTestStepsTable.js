import { useEffect, useState } from "react";
import { testStepCommands } from "../../redux/actionsAPI/apis/testStepApi";
import { Container, Table } from "react-bootstrap";
import { TestResultColors } from "../../utils/colorConstants";
import { subtestCommands } from "../../redux/actionsAPI/apis/subtestApi";

export default function DashboardTestStepsTable(props) {
    const noWarning = "No warning";
    const noError = "No error";
    const [totalNumber, setTotalNumber] = useState(0);
    const [totalPassedNumber, setTotalPassedNumber] = useState(0);
    const [percentagePassed, setPercentagePassed] = useState(0);

    const [testStepsList, setTestSteps] = useState({});
    
    useEffect(() => {
        testStepCommands
            .getAllTestStepsOfSubtestWithId(props.subtestId)
            .then(response => {
                setTestSteps(response);
                const totalCount = Object.keys(response).length;
                setTotalNumber(totalCount);
    
                // Calculate the number of passed test steps
                const passedStepsCount = Object.values(response).filter(step => step.resultType.id === 1).length;
                setTotalPassedNumber(passedStepsCount);
    
                if (totalCount !== 0) {
                    setPercentagePassed(Math.round(passedStepsCount * 100.0 / totalCount));
                }
            })
            .catch(error => alert(error));
    
    }, [props.subtestId, totalNumber, totalPassedNumber]);

    return (
        <div>
            <br></br>
            {
                props.subtestId ?
                    <div>
                        <div className="teststep-list">
                            <h3>Test Steps for Subtest with Id {props.subtestId}:</h3>
                            <div>Total test steps: {totalNumber}</div>
                            <div>Total passed test steps: {totalPassedNumber}</div>
                            <br></br>
                            <p style={{backgroundColor: totalNumber === totalPassedNumber ? TestResultColors[1] : TestResultColors[2], color: 'white', marginLeft: '5px'}}><b>{percentagePassed}% passed</b></p>
                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}>Test step Id</th>
                                            <th style={{ width: '10%' }}>Step number</th>
                                            <th style={{ width: '25%' }}>Details</th>
                                            <th style={{ width: '25%' }}>Error reason</th>
                                            <th style={{ width: '10%' }}>Warning code</th>
                                            <th style={{ width: '20%' }}>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.values(testStepsList).map(item => {
                                                var tdStyle = { backgroundColor: TestResultColors[item.resultType.id] };
                                                return (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>{item.stepNo}</td>
                                                        <td>{item.result_details}</td>
                                                        <td>{item.testError ? item.testError.errorCode : noError}</td>
                                                        <td>{item.testWarning ? item.testWarning.warningCode : noWarning}</td>
                                                        <td style={tdStyle}></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </div>

                    </div> :
                    <div>Select a subtest to see its test steps</div>
            }
        </div>
    );
}