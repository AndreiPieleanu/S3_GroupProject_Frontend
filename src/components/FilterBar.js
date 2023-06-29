import Container from "react-bootstrap/Container";
import ViewTypes from "../utils/ViewTypes";
import React, {useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {fetchTestStepsByResultType} from "../redux/actionsAPI/fetchByResult/fetchTestStepsByResultType";
import {Button} from "react-bootstrap";
import {
    setCommitFilterCode,
    setCommitId,
    setErrorTerm,
    setSubtestFilterCode,
    setSubTestId,
    setTestFilterCode,
    setTestId,
    setTestSetFilterCode,
    setTestSetId,
    setTestStepFilterCode
} from "../redux/actions";
import {fetchSubtestResult} from "../redux/actionsAPI/fetchByResult/fetchSubTestByResult";
import {fetchTestResult} from "../redux/actionsAPI/fetchByResult/fetchTestByResult";
import {fetchTestSetResult} from "../redux/actionsAPI/fetchByResult/fetchTestSetByResult";
import {fetchCommitsResult} from "../redux/actionsAPI/fetchByResult/fetchCommitsByResult";
import {fetchTestStepsByErrorType} from "../redux/actionsAPI/fetchByError/fetchTestStepsByErrorType";
import {fetchSubtestError} from "../redux/actionsAPI/fetchByError/fetchSubTestByErrorType";
import {fetchTestError} from "../redux/actionsAPI/fetchByError/fetchTestByErrorType";
import {fetchTestsetError} from "../redux/actionsAPI/fetchByError/fetchTestSetByErrorType";
import {fetchCommitsByErrorType} from "../redux/actionsAPI/fetchByError/fetchCommitsByErrorType";

function FilterBar({
                       currentView,
                       fetchTestError,
                       fetchTestStepsByErrorType,
                       fetchSubtestError,
                       fetchTestSetError,
                       fetchCommitsError,
                       fetchTestStepsByResultType,
                       fetchSubtestResult,
                       fetchTestResult,
                       fetchTestSetResult,
                       fetchCommitsResult
                   }) {
    const dispatch = useDispatch();


    //TESTSTEPS RESULT
    const subTestId = useSelector((state) => state.subTestId)
    const handleTestStepsResultFilter = (code) => {
        fetchTestStepsByResultType(code, subTestId.subTestId);
        dispatch(setTestStepFilterCode(code));
    };
    //TESTSTEPS ERROR
    const handleTestStepsErrorFilter = (code) => {
        fetchTestStepsByErrorType(code, subTestId.subTestId)
        dispatch(setErrorTerm(code))
    }
    //SUBTESTS RESULT
    const testId = useSelector((state) => state.testId);
    const handleSubTestResultFilter = (code) => {
        fetchSubtestResult(code, testId.testId);
        dispatch(setSubtestFilterCode(code));
    }
    //SUBTESTS ERROR
    const handleSubTestsErrorFilter = (code) => {
        fetchSubtestError(code, testId.testId)
        dispatch(setErrorTerm(code))
    }
    //TEST RESULT
    const testSetId = useSelector((state) => state.testSetId);
    const handleTestResultFilter = (code) => {
        fetchTestResult(code, testSetId.testSetId);
        dispatch(setTestFilterCode(code));
    }
    //TEST ERROR
    const handleTestsErrorFilter = (code) => {
        fetchTestError(code, testSetId.testSetId)
        dispatch(setErrorTerm(code))
    }

    //TESTSET RESULT
    const commitId = useSelector((state) => state.commitId);
    const handleTestSetResultFilter = (code) => {
        fetchTestSetResult(code, commitId.commitId);
        dispatch(setTestSetFilterCode(code));
    }
    //TESTSET ERROR
    const handleTestSetsErrorFilter = (code) => {
        fetchTestSetError(code, commitId.commitId)
        dispatch(setErrorTerm(code))
    }

    //COMMITRESULT
    const branchId = useSelector((state) => state.branchId);
    const handleCommitResultFilter = (code) => {
        fetchCommitsResult(code, branchId.branchId);
        dispatch(setCommitFilterCode(code));
    }
    //COMIT ERROR
    const handleCommitErrorFilter = (code) => {
        fetchCommitsError(code, branchId.branchId)
        dispatch(setErrorTerm(code))
    }
    const handleResetFilter = () => {
        dispatch(setTestStepFilterCode(null))
        dispatch(setSubTestId(subTestId.subTestId))
        dispatch(setSubtestFilterCode(null))
        dispatch(setTestId(testId.testId))
        dispatch(setTestFilterCode(null))
        dispatch(setTestSetId(testSetId.testSetId))
        dispatch(setTestSetFilterCode(null))
        dispatch(setCommitId(commitId.commitId))
        dispatch(setCommitFilterCode(null))
        dispatch(setErrorTerm(null))
        setResultFilter(null);
        setErrorFilter(null);
        // dispatch(setBranchFilterCode(null))

    }
    let onClickResultFilterHandler;
    let onClickErrorFilterHandler;
    switch (currentView.currentView) {
        case ViewTypes.TEST_STEP:
            onClickResultFilterHandler = handleTestStepsResultFilter;
            onClickErrorFilterHandler = handleTestStepsErrorFilter;
            break;
        case ViewTypes.SUBTEST:
            onClickResultFilterHandler = handleSubTestResultFilter;
            onClickErrorFilterHandler = handleSubTestsErrorFilter;

            break;
        case ViewTypes.TEST:
            onClickResultFilterHandler = handleTestResultFilter;
            onClickErrorFilterHandler = handleTestsErrorFilter;

            break;
        case ViewTypes.TEST_SET:
            onClickResultFilterHandler = handleTestSetResultFilter;
            onClickErrorFilterHandler = handleTestSetsErrorFilter;

            break;
        case ViewTypes.COMMITS:
            onClickResultFilterHandler = handleCommitResultFilter;
            onClickErrorFilterHandler = handleCommitErrorFilter;

            break;
        default:

            break;
    }
    //COLOR CHANGE CODE
    const [resultFilter, setResultFilter] = useState(null);
    const [errorFilter, setErrorFilter] = useState(null);
    const handleResultFilterClick = (filterValue) => {
        setResultFilter(filterValue);
        setErrorFilter(null);
    };

    const handleErrorFilterClick = (filterValue) => {
        setResultFilter(null);
        setErrorFilter(filterValue);
    };
    const getButtonVariant = (filterValue, selectedFilter) => {
        if (filterValue === selectedFilter) {
            return 'warning';
        }
        return 'primary';
    };
    return (<Container style={{display: 'flex', flexWrap: 'wrap', gap: '3px'}}>

            <div style={{color: 'red', fontSize: 'small', float: "left"}}>
                <b>Result Filter:</b>
            </div>

            <Button style={{float: "left", clear: "left"}}
                variant={getButtonVariant(1, resultFilter)}
                size="sm"
                onClick={() => {
                    handleResultFilterClick(1);
                    onClickResultFilterHandler(1);
                }}
            >
                Passed
            </Button>
            <Button
                variant={getButtonVariant(2, resultFilter)}
                size="sm"
                onClick={() => {
                    handleResultFilterClick(2);
                    onClickResultFilterHandler(2);
                }}
            >
                Failed
            </Button>
            <Button
                variant={getButtonVariant(3, resultFilter)}
                size="sm"
                onClick={() => {
                    handleResultFilterClick(3);
                    onClickResultFilterHandler(3);
                }}
            >
                Tool Died
            </Button>
            <Button
                variant={getButtonVariant(4, resultFilter)}
                size="sm"
                onClick={() => {
                    handleResultFilterClick(4);
                    onClickResultFilterHandler(4);
                }}
            >
                Aborted Job
            </Button>
            <Button
                variant={getButtonVariant(5, resultFilter)}
                size="sm"
                onClick={() => {
                    handleResultFilterClick(5);
                    onClickResultFilterHandler(5);
                }}
            >
                No Results
            </Button><Button variant="secondary"
                             size="sm" onClick={() => handleResetFilter()}>
            Reset Filters
        </Button>


            <div style={{display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
                <div>
                    <div style={{color: 'red', fontSize: 'small'}}>
                        <b>Error Filter:</b>
                    </div>
                </div>
                <Button
                    variant={getButtonVariant(1, errorFilter)}
                    size="sm"
                    onClick={() => {
                        handleErrorFilterClick(1);
                        onClickErrorFilterHandler(1);
                    }}
                >
                    Could not find Method!
                </Button>
                <Button
                    variant={getButtonVariant(2, errorFilter)}
                    size="sm"
                    onClick={() => {
                        handleErrorFilterClick(2);
                        onClickErrorFilterHandler(2);
                    }}
                >
                    NullPointerException
                </Button>
                <Button
                    variant={getButtonVariant(3, errorFilter)}
                    size="sm"
                    onClick={() => {
                        handleErrorFilterClick(3);
                        onClickErrorFilterHandler(3);
                    }}
                >
                    Could not open file!
                </Button>
                <Button
                    variant={getButtonVariant(4, errorFilter)}
                    size="sm"
                    onClick={() => {
                        handleErrorFilterClick(4);
                        onClickErrorFilterHandler(4);
                    }}
                >
                    Method returned unexpected result!
                </Button>
            </div>
        </Container>


    );


}

const mapStateToProps = state => {
    return {
        currentView: state.currentView,
        testStepsData: state.testStepsData,
        subTestData: state.subTestData,
    };
};
const mapDispatchToProps = dispatch => ({
    fetchTestStepsByResultType: (code, subTestId) => dispatch(fetchTestStepsByResultType(code, subTestId)),
    fetchSubtestResult: (code, testId) => dispatch(fetchSubtestResult(code, testId)),
    fetchTestResult: (code, testSetId) => dispatch(fetchTestResult(code, testSetId)),
    fetchTestSetResult: (code, commitId) => dispatch(fetchTestSetResult(code, commitId)),
    fetchCommitsResult: (code, branchId) => dispatch(fetchCommitsResult(code, branchId)),
    fetchTestStepsByErrorType: (code, subTestId) => dispatch(fetchTestStepsByErrorType(code, subTestId)),
    fetchSubtestError: (code, testId) => dispatch(fetchSubtestError(code, testId)),
    fetchTestError: (code, testSetId) => dispatch(fetchTestError(code, testSetId)),
    fetchTestSetError: (code, commitId) => dispatch(fetchTestsetError(code, commitId)),
    fetchCommitsError: (code, branchId) => dispatch(fetchCommitsByErrorType(code, branchId))
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);


/*

    }*/