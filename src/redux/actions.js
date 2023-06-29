// Constants used to define action types
export const SET_BRANCH_ID = 'SET_BRANCH_ID';
export const SET_TEST_SET_ID = 'SET_TEST_SET_ID';
export const SET_TEST_ID = 'SET_TEST_ID';
export const SET_SUBTEST_ID = 'SET_SUBTEST_ID';
export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW';
export const SET_TEST_COUNT = 'SET_TEST_COUNT';
export const SET_BRANCH_NAME = 'SET_BRANCH_NAME';
export const SET_COMMIT_ID = 'SET_COMMIT_ID';
export const SET_TEST_STEPS_FILTER_CODE ='SET_TEST_STEPS_FILTER_CODE';
export const SET_COMMIT_NAME = 'SET_COMMIT_NAME';
export const SET_TEST_SET_NAME = 'SET_TEST_SET_NAME';
export const SET_TEST_NAME = 'SET_TEST_NAME';
export const SET_SUB_TEST_NAME = 'SET_SUB_TEST_NAME';
export const SET_TEST_STEP_NAME = 'SET_TEST_STEP_NAME';
export const SET_COUNT_RESULT='SET_COUNT_RESULT'

/** Note: This code exports several actions creators, each of which returns an object
 // that includes a "type" property (corresponding to one of the action types) and a "payload"
 // property (containing the data to be dispatched to the store). The action types are used
 // in reducers to identify which property to update, and the payloads contains the
 // new values for the corresponding properties.*/
export function setCountResult(result) {
    return {type: SET_COUNT_RESULT, payload: result};
}

// Action creators for each action type
export function setBranchName(name) {
    return {type: SET_BRANCH_NAME, payload: name};
}
export function setCurrentView(view) {
    return {type: SET_CURRENT_VIEW, payload: view};
}
export function setBranchId(branchId) {
    return {type: SET_BRANCH_ID, payload: branchId};
}
export function setTestSetId(testSetId) {
    return {type: SET_TEST_SET_ID, payload: testSetId};
}
export function setCommitId(commitId){
    return {type: SET_COMMIT_ID, payload: commitId}
}

export function setTestId(testId) {
    return {type: SET_TEST_ID, payload: testId};
}

export function setSubTestId(subTestId) {
    return {type: SET_SUBTEST_ID, payload: subTestId};
}
export function setTestStepFilterCode(code){
    return{type:SET_TEST_STEPS_FILTER_CODE,payload:code}
}
export const COMMIT_FILTER_CODE = 'COMMIT_FILTER_CODE';
export function setCommitFilterCode(code) {
    return { type: COMMIT_FILTER_CODE, payload: code };
}

export const TEST_FILTER_CODE = 'TEST_FILTER_CODE';
export function setTestFilterCode(code) {
    return { type: TEST_FILTER_CODE, payload: code };
}

export const TEST_SET_FILTER_CODE = 'TEST_SET_FILTER_CODE';

export function setTestSetFilterCode(code) {
    return {type: TEST_SET_FILTER_CODE, payload: code};
}

export const SUBTEST_FILTER_CODE = 'SUBTEST_FILTER_CODE';

export function setSubtestFilterCode(code) {
    return {type: SUBTEST_FILTER_CODE, payload: code};
}

export const SET_COMMIT_VERSION = 'SET_COMMIT_VERSION'

export function setCommitVersion(code) {
    return {type: SET_COMMIT_VERSION, payload: code}
}

export const SET_ERROR_TERM = 'SET_ERROR_TERM'

export function setErrorTerm(searchTerm) {
    return {type: SET_ERROR_TERM, payload: searchTerm}
}
export function setCommitName(name) {
    return { type: SET_COMMIT_NAME, payload: name };
}

export function setTestSetName(name) {
    return { type: SET_TEST_SET_NAME, payload: name };
}

export function setTestName(name) {
    return { type: SET_TEST_NAME, payload: name };
}

export function setSubTestName(name) {
    return { type: SET_SUB_TEST_NAME, payload: name };
}

export function setTestStepName(name) {
    return { type: SET_TEST_STEP_NAME, payload: name };
}



