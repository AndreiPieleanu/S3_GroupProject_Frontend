import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import "./linksStyle.css";
import {connect, useDispatch, useSelector} from "react-redux";
import {fetchTestSetData} from "../redux/actionsAPI/fetchTestSetData";
import {useEffect} from "react";
import ViewTypes from "../utils/ViewTypes";
import {setCurrentView, setTestId, setTestName} from "../redux/actions";
import {Link} from "react-router-dom";
import {fetchTestResult} from "../redux/actionsAPI/fetchByResult/fetchTestByResult";
import {fetchTestsetError} from "../redux/actionsAPI/fetchByError/fetchTestSetByErrorType";
import {fetchTestError} from "../redux/actionsAPI/fetchByError/fetchTestByErrorType";
import { testCommands } from "../redux/actionsAPI/apis/testApi";
import { useState } from "react";

function TestsList({fetchTestResult, fetchTestSetData,fetchTestError}) {
    const filterCode = useSelector((state) => state.filterTestCode)
    const testSetIdState = useSelector((state) => state.testSetId);
    let testSetDataState = useSelector((state) => state.testSetData);
    const testFilterState = useSelector((state)=>state.testResult)
    const errorFilterCode = useSelector((state)=>state.errorTerm)
    const errorFilteredData = useSelector((state)=>state.testError)
    const testSetName = useSelector((state)=>state.testSetName)
    const dispatch = useDispatch();

    const [count, setCount] = useState(null);

    useEffect(() => {
        if (testSetIdState) {
            fetchTestSetData(testSetIdState.testSetId);
        }
        else if(filterCode){
            fetchTestResult(filterCode,testSetIdState.testSetId)
        }
        else if(errorFilterCode.errorTerm){
            fetchTestError(testSetIdState.testSetId,errorFilterCode)
        }
    }, [testSetIdState,filterCode,errorFilterCode]);


    useEffect(() => {
        fetchCount();
    }, []);

    const fetchCount = async () => {
         await testCommands.getSubtestsNumberOfTestInTestSetWithId(testSetIdState.testSetId)
           .then(response => setCount(response));
    }

    if (filterCode.filterTestCode) {
        console.log("IMHERE")
        testSetDataState = testFilterState
    }
    else if(errorFilterCode.errorTerm){
        testSetDataState = errorFilteredData
    }
    function onClickTestSelection(id,name) {
        dispatch(setTestId(id))
        dispatch(setTestName(name))
        dispatch(setCurrentView(ViewTypes.SUBTEST))
    }

    let testItems = null;
    console.log(testSetDataState,errorFilteredData)
    if (testSetDataState.testSetData.testResults && !testSetDataState.testSetData.isLoading) {
        testItems = Object.keys(testSetDataState.testSetData.testResults).map((testId) => {
            const test = testSetDataState.testSetData.testResults[testId];

            return (
                <tr key={test.id}>
                    <td>
                        <Link className="tableLinks" onClick={() => onClickTestSelection(test.id,test.name)}>{test.name}</Link>
                    </td>
                    <td>{count ? <span>{count[testId]}</span> : null}</td>
                </tr>
            );
        });

        if (!testSetDataState || testSetDataState.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <Container>
                <h3>TestSet <b>{testSetName.testSetName}</b>:</h3>
                {testSetDataState ? (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Number of SubTests</th>
                        </tr>
                        </thead>
                        <tbody>{testItems}</tbody>
                    </Table>
                ) : (
                    <div>Loading tests...</div>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        testSetData: state.testSetData,
        branchId: state.branchId,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTestSetData: (testSetId) => dispatch(fetchTestSetData(testSetId)),
    fetchTestResult: (code, testSetId) => dispatch(fetchTestResult(code, testSetId)),
    fetchTestError:(code, commitId) => dispatch(fetchTestError(code, commitId)),


});
export default connect(mapStateToProps, mapDispatchToProps)(TestsList);