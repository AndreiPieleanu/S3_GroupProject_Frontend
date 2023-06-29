import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import "./linksStyle.css";
import React, {useEffect} from "react";

import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchTestData} from "../redux/actionsAPI/fetchTestData";
import {setCountResult, setCurrentView, setSubTestId, setSubTestName} from "../redux/actions";
import ViewTypes from "../utils/ViewTypes";
import {Link} from "react-router-dom";
import AutoRefresh from "./AutoRefresh";
import {fetchSubtestResult} from "../redux/actionsAPI/fetchByResult/fetchSubTestByResult";
import {fetchSubtestError} from "../redux/actionsAPI/fetchByError/fetchSubTestByErrorType";
import {fetchTestStepCountData} from "../redux/actionsAPI/fetchCount/fetchCountOfTestStepPerSubTest";
import { useState } from "react";
import { subtestCommands } from "../redux/actionsAPI/apis/subtestApi";


function SubTestsList({fetchTestData, fetchSubtestResult, fetchSubTestError}) {
    const testIdState = useSelector((state) => state.testId)
    let testDataState = useSelector((state) => state.testData)
    const filterCode = useSelector((state) => state.filterSubtestCode)
    const subTestsByResult = useSelector((state) => state.subtestResult)
    const errorFilterCode = useSelector((state) => state.errorTerm)
    const errorFilteredData = useSelector((state) => state.subtestError)
    const testStepCount = useSelector((state) => state.testStepCount)
    const testName=useSelector((state)=>state.testName)
    console.log("TESTSETADTA", testDataState)
    const dispatch = useDispatch();

    const [count, setCount] = useState(null);

    useEffect(() => {
        if (testIdState) {
            fetchTestData(testIdState.testId);
        } else if (filterCode) {
            fetchSubtestResult(filterCode, testIdState.testId);
        } else if (errorFilterCode.errorTerm) {
            fetchSubTestError(testIdState.testIdState, errorFilterCode)
        }
    }, [testIdState, filterCode, errorFilterCode]);


    useEffect(() => {
        fetchCount();
    }, []);

    const fetchCount = async () => {
         await subtestCommands.getTestStepsNumberOfSubestInTestWithId(testIdState.testId)
           .then(response => setCount(response));
    }


    if (filterCode.filterSubtestCode) {
        testDataState = subTestsByResult
    } else if (errorFilterCode.errorTerm) {
        testDataState = errorFilteredData
    }

    function onClickSubTestSelection(id,name) {
        dispatch(setSubTestId(id))
        dispatch(setSubTestName(name))
        dispatch(setCurrentView(ViewTypes.TEST_STEP))
    }

    let idOfSubTestToBeCounted = null;

    useEffect(() => {
        dispatch(fetchTestStepCountData(idOfSubTestToBeCounted))
    }, [idOfSubTestToBeCounted])

    let testItems = null;
    if (testDataState && testDataState.isLoading == false && testDataState.testData.subtests) {
        testItems = Object.keys(testDataState.testData.subtests).map((subtestId) => {
                const test = testDataState.testData.subtests[subtestId];
                idOfSubTestToBeCounted = subtestId;

                return <tr>
                    <td><Link className="tableLinks"
                              onClick={() => onClickSubTestSelection(subtestId,test.name)}>{test.name}</Link></td>
                    <td>{count ? <span>{count[subtestId]}</span> : null}</td>
                </tr>;
            }
        )
        return (
            <Container>
                <h3>Test <b>{testName.testName}</b>:</h3>
                {testDataState ?
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Subtest Name</th>
                            <th>Number of Steps</th>
                        </tr>
                        </thead>
                        <tbody><AutoRefresh refreshInterval={5000}
                                            fetchAction={() => fetchTestData(testIdState.testId)}>
                            {testItems}
                        </AutoRefresh>
                        </tbody>
                    </Table>
                    :
                    <div>Loading tests...</div>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        testData: state.testData
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTestData: (testId) => dispatch(fetchTestData(testId)),
    fetchSubtestResult: (code, testId) => dispatch(fetchSubtestResult(code, testId)),
    fetchSubTestError: (code, commitId) => dispatch(fetchSubtestError(code, commitId)),
    fetchTestStepCountData: (stepId) => dispatch(fetchTestStepCountData(stepId)),

});
export default connect(mapStateToProps, mapDispatchToProps)(SubTestsList);
