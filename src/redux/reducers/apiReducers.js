import {
    FETCH_BRANCH_DATA_FAILURE,
    FETCH_BRANCH_DATA_REQUEST,
    FETCH_BRANCH_DATA_SUCCESS
} from "../actionsAPI/fetchBranchData";
import {
    FETCH_COMMIT_DATA_FAILURE,
    FETCH_COMMIT_DATA_REQUEST,
    FETCH_COMMIT_DATA_SUCCESS
} from "../actionsAPI/fetchCommitData";
import {
    FETCH_SUBTEST_DATA_FAILURE,
    FETCH_SUBTEST_DATA_REQUEST,
    FETCH_SUBTEST_DATA_SUCCESS
} from "../actionsAPI/fetchSubTestData";
import {FETCH_BRANCHES_FAILURE, FETCH_BRANCHES_REQUEST, FETCH_BRANCHES_SUCCESS} from "../actionsAPI/fetchBranches";
import {
    FETCH_TEST_ERRORS_FAILURE,
    FETCH_TEST_ERRORS_REQUEST,
    FETCH_TEST_ERRORS_SUCCESS
} from "../actionsAPI/fetchTestErrors";
import {FETCH_TEST_DATA_FAILURE, FETCH_TEST_DATA_REQUEST, FETCH_TEST_DATA_SUCCESS} from "../actionsAPI/fetchTestData";
import {
    FETCH_TEST_STEPS_BY_RESULT_FAILURE,
    FETCH_TEST_STEPS_BY_RESULT_REQUEST,
    FETCH_TEST_STEPS_BY_RESULT_SUCCESS
} from "../actionsAPI/fetchByResult/fetchTestStepsByResultType";
import {
    FETCH_TEST_SET_DATA_FAILURE,
    FETCH_TEST_SET_DATA_REQUEST,
    FETCH_TEST_SET_DATA_SUCCESS
} from "../actionsAPI/fetchTestSetData";

import {
    FETCH_COMMITS_BY_ERROR_FAILURE,
    FETCH_COMMITS_BY_ERROR_REQUEST,
    FETCH_COMMITS_BY_ERROR_SUCCESS
} from "../actionsAPI/fetchByError/fetchCommitsByErrorType";
import {
    FETCH_TESTSET_ERROR_FAILURE,
    FETCH_TESTSET_ERROR_REQUEST,
    FETCH_TESTSET_ERROR_SUCCESS
} from "../actionsAPI/fetchByError/fetchTestSetByErrorType";
import {
    FETCH_TESTSET_RESULT_FAILURE, FETCH_TESTSET_RESULT_REQUEST,
    FETCH_TESTSET_RESULT_SUCCESS
} from "../actionsAPI/fetchByResult/fetchTestSetByResult";
import {
    FETCH_TEST_ERROR_FAILURE,
    FETCH_TEST_ERROR_REQUEST,
    FETCH_TEST_ERROR_SUCCESS
} from "../actionsAPI/fetchByError/fetchTestByErrorType";
import {
    FETCH_TEST_RESULT_FAILURE,
    FETCH_TEST_RESULT_REQUEST,
    FETCH_TEST_RESULT_SUCCESS
} from "../actionsAPI/fetchByResult/fetchTestByResult";
import {
    FETCH_SUBTEST_ERROR_FAILURE, FETCH_SUBTEST_ERROR_REQUEST,
    FETCH_SUBTEST_ERROR_SUCCESS
} from "../actionsAPI/fetchByError/fetchSubTestByErrorType";
import {
    FETCH_SUBTEST_RESULT_FAILURE, FETCH_SUBTEST_RESULT_REQUEST,
    FETCH_SUBTEST_RESULT_SUCCESS
} from "../actionsAPI/fetchByResult/fetchSubTestByResult";
import {
    FETCH_COMMITS_RESULT_FAILURE, FETCH_COMMITS_RESULT_REQUEST,
    FETCH_COMMITS_RESULT_SUCCESS
} from "../actionsAPI/fetchByResult/fetchCommitsByResult";
import {
    FETCH_COMMITS_BY_VERSION_FAILURE, FETCH_COMMITS_BY_VERSION_REQUEST,
    FETCH_COMMITS_BY_VERSION_SUCCESS
} from "../actionsAPI/fetchByError/fetchCommitsByVersion";
import {
    FETCH_TEST_STEPS_BY_ERROR_FAILURE,
    FETCH_TEST_STEPS_BY_ERROR_REQUEST,
    FETCH_TEST_STEPS_BY_ERROR_SUCCESS
} from "../actionsAPI/fetchByError/fetchTestStepsByErrorType";

export const branchesInitialState = {
    branches: {},
    isLoading: true,
    error: ""
}
// The reducer function handles state updates for branches data
export const branchesReducer = (state = branchesInitialState, action) => {
    switch (action.type) {
        case FETCH_BRANCHES_SUCCESS:
            // When a FETCH_BRANCHES_SUCCESS action is dispatched, update the branches data with the new payload
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                branches: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_BRANCHES_REQUEST:
            // When a FETCH_BRANCHES_REQUEST action is dispatched, set isLoading to true and clear the error message
            console.log("Fetching branches...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_BRANCHES_FAILURE:
            // When a FETCH_BRANCHES_FAILURE action is dispatched, update the error message and set isLoading to false
            console.log("Action error: ", action.payload);
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            // If no matching action type is found, return the existing state
            return state;
    }
};

export const testStepByErrorInitialState = {
    subTestData: {},
    isLoading: true,
    error: ""
}
export const testStepsByErrorReducer = (state = testStepByErrorInitialState, action) => {
    switch (action.type) {
        case FETCH_TEST_STEPS_BY_ERROR_REQUEST:
            console.log("Fetching test steps by result data...");

        case FETCH_TEST_STEPS_BY_ERROR_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                subTestData: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_TEST_STEPS_BY_ERROR_FAILURE:
            // If no matching action type is found, return the existing state
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const testStepByResultInitialState = {
    subTestData: {},
    isLoading: true,
    error: ""
}
export const testStepsByResultReducer = (state = testStepByResultInitialState, action) => {
    switch (action.type) {
        case FETCH_TEST_STEPS_BY_RESULT_REQUEST:
            console.log("Fetching test steps by result data...");

        case FETCH_TEST_STEPS_BY_RESULT_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                subTestData: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_TEST_STEPS_BY_RESULT_FAILURE:
            // If no matching action type is found, return the existing state
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const testErrorsInitialState = {testData: {}, isLoading: false, error: ""};
export const testErrorsReducer = (state = testErrorsInitialState, action) => {
    switch (action.type) {
        case FETCH_TEST_ERRORS_SUCCESS:
            // When a FETCH_TEST_ERRORS_SUCCESS action is dispatched, update the branches data with the new payload
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                testData: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_TEST_ERRORS_REQUEST:
            // When a FETCH_BRANCHES_REQUEST action is dispatched, set isLoading to true and clear the error message
            console.log("Fetching branches...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_TEST_ERRORS_FAILURE:
            // When a FETCH_BRANCHES_FAILURE action is dispatched, update the error message and set isLoading to false
            console.log("Action error: ", action.payload);
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const commitsInitialState = {
    commits: {},
    isLoading: true,
    error: ""
}
export const commitsReducer = (state = commitsInitialState, action) => {
    switch (action.type) {
        case FETCH_COMMIT_DATA_SUCCESS:
            // When a FETCH_BRANCHES_SUCCESS action is dispatched, update the branches data with the new payload
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                commits: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_COMMIT_DATA_REQUEST:
            // When a FETCH_BRANCHES_REQUEST action is dispatched, set isLoading to true and clear the error message
            console.log("Fetching commits...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_COMMIT_DATA_FAILURE:
            // When a FETCH_BRANCHES_FAILURE action is dispatched, update the error message and set isLoading to false
            console.log("Action error: ", action.payload);
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            // If no matching action type is found, return the existing state
            return state;
    }
};
export const branchDataInitialState = {branchData: {}, isLoading: false, error: ""};
export const branchDataReducer = (state = branchDataInitialState, action) => {
    switch (action.type) {
        case FETCH_BRANCH_DATA_REQUEST:
            console.log("Fetching branch data...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_BRANCH_DATA_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                branchData: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_BRANCH_DATA_FAILURE:
            console.log("Action error: ", action.payload);
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const testSetDataInitialState = {testSetData: {}, isLoading: false, error: ""};
export const testSetDataReducer = (state = testSetDataInitialState, action) => {
    switch (action.type) {
        case FETCH_TEST_SET_DATA_REQUEST:
            console.log("Fetching test set data...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_TEST_SET_DATA_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                testSetData: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_TEST_SET_DATA_FAILURE:
            console.log("Action error: ", action.payload);
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const testDataInitialState = {testData: {}, isLoading: false, error: ""};
export const testDataReducer = (state = testDataInitialState, action) => {
    switch (action.type) {
        case FETCH_TEST_DATA_REQUEST:
            console.log("Fetching test data...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_TEST_DATA_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                testData: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_TEST_DATA_FAILURE:
            console.log("Action error: ", action.payload);
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const subTestDataInitialState = {subTestData: {}, isLoading: false, error: ""};
export const subTestDataReducer = (state = subTestDataInitialState, action) => {
    switch (action.type) {
        case FETCH_SUBTEST_DATA_REQUEST:
            console.log("Fetching subtest data...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_SUBTEST_DATA_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                subTestData: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_SUBTEST_DATA_FAILURE:
            console.log("Action error: ", action.payload);
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}


////////////////FITLERS/////////
export const commitsResultInitialState = {
    branchData: {},
    isLoading: true,
    error: ""
};

export const commitsResultReducer = (state = commitsResultInitialState, action) => {
    switch (action.type) {
        case FETCH_COMMITS_RESULT_REQUEST:
            console.log("Fetching commits result data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_COMMITS_RESULT_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                branchData: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_COMMITS_RESULT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const commitsErrorInitialState = {
    branchData: {},
    isLoading: true,
    error: ""
};

export const commitsErrorReducer = (state = commitsErrorInitialState, action) => {
    switch (action.type) {
        case FETCH_COMMITS_BY_ERROR_REQUEST:
            console.log("Fetching commits error data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_COMMITS_BY_ERROR_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                branchData: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_COMMITS_BY_ERROR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

// For SUBTEST RESULT and ERROR
export const subtestResultInitialState = {
    testData: {},
    isLoading: true,
    error: ""
};

export const subtestResultReducer = (state = subtestResultInitialState, action) => {
    switch (action.type) {
        case FETCH_SUBTEST_RESULT_REQUEST:
            console.log("Fetching subtest result data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_SUBTEST_RESULT_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                testData: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_SUBTEST_RESULT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const subtestErrorInitialState = {
    testData: {},
    isLoading: true,
    error: ""
};

export const subtestErrorReducer = (state = subtestErrorInitialState, action) => {
    switch (action.type) {
        case FETCH_SUBTEST_ERROR_REQUEST:
            console.log("Fetching subtest error data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_SUBTEST_ERROR_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                testData: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_SUBTEST_ERROR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

// For test RESULT and ERROR
export const testResultInitialState = {
    testSetData: {},
    isLoading: true,
    error: ""
};

export const testResultReducer = (state = testResultInitialState, action) => {
    switch (action.type) {
        case FETCH_TEST_RESULT_REQUEST:
            console.log("Fetching test result data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_TEST_RESULT_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                testSetData: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_TEST_RESULT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const testErrorInitialState = {
    testSetData: {},
    isLoading: true,
    error: ""
};

export const testErrorReducer = (state = testErrorInitialState, action) => {
    switch (action.type) {
        case FETCH_TEST_ERROR_REQUEST:
            console.log("Fetching test error data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_TEST_ERROR_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                testSetData: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_TEST_ERROR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

// For testSet RESULT and ERROR
export const testSetResultInitialState = {
    commits: {},
    isLoading: true,
    error: ""
};

export const testsetResultReducer = (state = testSetResultInitialState, action) => {
    switch (action.type) {
        case FETCH_TESTSET_RESULT_REQUEST:
            console.log("Fetching testset result data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_TESTSET_RESULT_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                commits: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_TESTSET_RESULT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const testsetErrorInitialState = {
    commits: {},
    isLoading: true,
    error: ""
};

export const testsetErrorReducer = (state = testsetErrorInitialState, action) => {
    switch (action.type) {
        case FETCH_TESTSET_ERROR_REQUEST:
            console.log("Fetching testset error data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_TESTSET_ERROR_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                commits: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_TESTSET_ERROR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const fetchByCommitVersionInitialState = {
    branchData: {},
    isLoading: true,
    error: ""
};

export const commitsByVersionReducer = (state = fetchByCommitVersionInitialState, action) => {
    switch (action.type) {
        case FETCH_COMMITS_BY_VERSION_REQUEST:
            console.log("Fetching testset error data...");
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_COMMITS_BY_VERSION_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                branchData: action.payload,
                isLoading: false,
                error: ""
            };
        case FETCH_COMMITS_BY_VERSION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};