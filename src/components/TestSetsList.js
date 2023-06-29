import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import "./linksStyle.css";

import {connect, useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setCurrentView, setTestSetId, setTestSetName} from "../redux/actions";
import {Link} from "react-router-dom";
import ViewTypes from "../utils/ViewTypes";
import {fetchCommitData} from "../redux/actionsAPI/fetchCommitData";
import AutoRefresh from "./AutoRefresh";
import {fetchTestSetResult} from "../redux/actionsAPI/fetchByResult/fetchTestSetByResult";
import {fetchTestsetError} from "../redux/actionsAPI/fetchByError/fetchTestSetByErrorType";
import { testSetCommands } from "../redux/actionsAPI/apis/testSetApi";
import { useState } from "react";

function TestSetsList({commitData, fetchCommitData, fetchTestSetResult,fetchTestSetsError}) {

    const commitIdState = useSelector((state) => state.commitId);
    const filterCode = useSelector((state) => state.filterTestSetCode)
    const testSetFilterState = useSelector((state) => state.testSetResult)
    const errorFilterCode = useSelector((state)=>state.errorTerm)
    const errorFilteredData = useSelector((state)=>state.testSetError)
    const commitName = useSelector((state)=>state.commitName)
    const dispatch = useDispatch();

    const [count, setCount] = useState(null);

    useEffect(() => {
        if (commitIdState) {
            fetchCommitData(commitIdState.commitId);
        } else if (filterCode) {
            fetchTestSetResult(filterCode, commitIdState.commitId)
        }
        else if(errorFilterCode.errorTerm){
            fetchTestSetsError(commitIdState.commitId,errorFilterCode)
        }

    }, [commitIdState, filterCode,errorFilterCode]);

    useEffect(() => {
        fetchCount();
    }, []);

    const fetchCount = async () => {
         await testSetCommands.getTestsNumberOfTestSetInCommitWithId(commitIdState.commitId)
           .then(response => setCount(response));
    }

    function onClickTestSetSelection(id,name) {
        dispatch(setTestSetId(id))
        dispatch(setTestSetName(name))
        dispatch(setCurrentView(ViewTypes.TEST))
    }

    let testSetItems = null;
    console.log(commitData,testSetFilterState)
    if (filterCode.filterTestSetCode) {
        commitData = testSetFilterState
    }
    else if(errorFilterCode.errorTerm){
        commitData = errorFilteredData
    }
    if (commitData.commits && !commitData.isLoading) {
        console.log("IMHERE")

        testSetItems = Object.keys(commitData.commits.testSets).map((testSetId) => {
            const testSet = commitData.commits.testSets[testSetId];
            return (
                <tr key={testSet.id}>
                    <td><Link className="tableLinks" onClick={() => onClickTestSetSelection(testSet.id,testSet.name)}>{testSet.name}</Link></td>
                    <td>{count ? <span>{count[testSetId]}</span> : null}</td>
                </tr>
            );
        });
    }

    if (!commitData || commitData.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>

            <h3>Commit <b>{commitName.commitName}</b>:</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Test Set Name</th>
                    <th>Number of Tests</th>
                </tr>
                </thead>
                <tbody><AutoRefresh refreshInterval={5000} fetchAction={() => fetchCommitData(commitIdState.commitId)}>
                    {testSetItems}
                </AutoRefresh>
                </tbody>
            </Table>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        commitData: state.commitData,
    };
};
const mapDispatchToProps = dispatch => ({
    fetchCommitData: (commitId) => dispatch(fetchCommitData(commitId)),
    fetchTestSetResult: (code, commitId) => dispatch(fetchTestSetResult(code, commitId)),
    fetchTestSetsError:(code, commitId) => dispatch(fetchTestsetError(code, commitId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TestSetsList);