import {connect, useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import "./linksStyle.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import AutoRefresh from "./AutoRefresh";
import {fetchSubTestData} from "../redux/actionsAPI/fetchSubTestData";
import {fetchTestStepsByResultType} from "../redux/actionsAPI/fetchByResult/fetchTestStepsByResultType";
import {fetchTestStepsByErrorType} from "../redux/actionsAPI/fetchByError/fetchTestStepsByErrorType";

function TestSteps({subTestData, fetchSubTestData, fetchTestStepsByResultType,fetchTestStepsByErrorType}) {
    const subTestIdIdState = useSelector((state) => state.subTestId);
    let testSubTestDataState = useSelector((state) => state.subTestData)
    const filterCode = useSelector((state) => state.filterTestStepCode)
    const testStepsByResult = useSelector((state) => state.testStepsByResult)
    const errorFilterCode = useSelector((state)=>state.errorTerm)
    const errorFilteredData = useSelector((state)=>state.testStepsByError)
    const subTestName = useSelector((state)=>state.subTestName)
    const dispatch = useDispatch();
    useEffect(() => {
        if (subTestIdIdState) {
            fetchSubTestData(subTestIdIdState.subTestId, filterCode);
        } else if (filterCode) {
            fetchTestStepsByResultType(filterCode, subTestIdIdState.subTestId)
        }
        else if(errorFilterCode){
            fetchTestStepsByErrorType(errorFilterCode, subTestIdIdState.subTestId)
        }
    }, [subTestIdIdState, filterCode]);
    if (filterCode.filterTestStepCode) {
        console.log("IMHERE")
        testSubTestDataState = testStepsByResult
    }
    else if(errorFilterCode.errorTerm){
        testSubTestDataState = errorFilteredData
    }

    let testStepItems = null;
    if (testSubTestDataState.subTestData && testSubTestDataState.isLoading == false && testSubTestDataState.subTestData.testSteps) {
        testStepItems = Object.keys(testSubTestDataState.subTestData.testSteps).map((testStepKey) => {
            const testStep = testSubTestDataState.subTestData.testSteps[testStepKey];
            return (
                <tr key={testStep.id}>
                    <td>{testStep.stepNo}</td>
                    <td>{testStep.resultType.resultName}</td>
                    <td>{testStep.result_details}</td>
                </tr>
            );
        });
    }

    return (
        <Container>
            <h3>Subtest <b>{subTestName.subTestName}:</b></h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Step No</th>
                    <th>Result</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                <AutoRefresh refreshInterval={5000}
                             fetchAction={() => fetchSubTestData(subTestIdIdState.subTestId)}>
                    {testStepItems}
                </AutoRefresh>
                </tbody>
            </Table>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        branchId: state.branchId,
        currentView: state.currentView,
        testStepsByResult: state.testStepsByResult
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSubTestData: (subTestId,) => dispatch(fetchSubTestData(subTestId)),
    fetchTestStepsByResultType: (subTestId, filterCode) => dispatch(fetchTestStepsByResultType(subTestId, filterCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(TestSteps);