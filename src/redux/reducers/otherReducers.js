import {
    COMMIT_FILTER_CODE,
    SET_BRANCH_NAME, SET_COMMIT_NAME,
    SET_COMMIT_VERSION,
    SET_CURRENT_VIEW,
    SET_ERROR_TERM, SET_SUB_TEST_NAME,
    SET_TEST_COUNT, SET_TEST_NAME, SET_TEST_SET_NAME, SET_TEST_STEP_NAME,
    SET_TEST_STEPS_FILTER_CODE,
    SUBTEST_FILTER_CODE,
    TEST_FILTER_CODE,
    TEST_SET_FILTER_CODE
} from "../actions";
import ViewTypes from "../../utils/ViewTypes";
const setTestCountInitialState = {count: null}
export const setTestCountReducer = (state = setTestCountInitialState, action) => {
    switch (action.type) {
        case SET_TEST_COUNT:
            return {
                ...state,
                testCount: action.payload,
            };
        default:
            return state;
    }
}

export const filterTestStepResultReducer = (state={}, action) => {
    switch (action.type) {
        case SET_TEST_STEPS_FILTER_CODE:
            return {
                ...state,
                filterTestStepCode: action.payload,
            };
        default:
            return state;
    }
};
export const commitCodeReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMIT_FILTER_CODE:
            return {
                ...state,
                filterCommitCode: action.payload,
            };
        default:
            return state;
    }
};

export const testCodeReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_FILTER_CODE:
            return {
                ...state,
                filterTestCode: action.payload,
            };
        default:
            return state;
    }
};

export const testSetCodeReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_SET_FILTER_CODE:
            return {
                ...state,
                filterTestSetCode: action.payload,
            };
        default:
            return state;
    }
};

export const subtestCodeReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBTEST_FILTER_CODE:
            return {
                ...state,
                filterSubtestCode: action.payload,
            };
        default:
            return state;
    }
};

const errorTermInitialState = {errorTerm: null}
export const errorTermReducer = (state = errorTermInitialState, action) => {
    switch (action.type) {
        case SET_ERROR_TERM:
            return {
                ...state,
                errorTerm: action.payload,
            };
        default:
            return state;
    }
}

const commitVersionInitialState = {commitVersion: null}
export const commitVersionReducer = (state = commitVersionInitialState, action) => {
    switch (action.type) {
        case SET_COMMIT_VERSION:
            return {
                ...state,
                commitVersion: action.payload,
            };
        default:
            return state;
    }
}


const branchNameInitialState = {branchName: null}
export const branchNameReducer = (state = branchNameInitialState, action) => {
    switch (action.type) {
        case SET_BRANCH_NAME:
            return {
                ...state,
                branchName: action.payload,
            };
        default:
            return state;
    }
};
const testCountInitialState = {testSetId: null}
export const testCountReducer = (state = testCountInitialState, action) => {
    switch (action.type) {
        case SET_TEST_COUNT:
            return {
                ...state,
                testSetId: action.payload,
            };
        default:
            return state;
    }
};
const currentViewInitialState = {currentView: ViewTypes.BRANCHES}
export const currentViewReducer = (state = currentViewInitialState, action) => {
    switch (action.type) {
        case SET_CURRENT_VIEW:
            return {
                ...state,
                currentView: action.payload,
            };
        default:
            return state;
    }
};
const commitNameInitialState = { commitName: null };
export const commitNameReducer = (state = commitNameInitialState, action) => {
    switch (action.type) {
        case SET_COMMIT_NAME:
            return {
                ...state,
                commitName: action.payload,
            };
        default:
            return state;
    }
};

const testSetNameInitialState = { testSetName: null };
export const testSetNameReducer = (state = testSetNameInitialState, action) => {
    switch (action.type) {
        case SET_TEST_SET_NAME:
            return {
                ...state,
                testSetName: action.payload,
            };
        default:
            return state;
    }
};

const testNameInitialState = { testName: null };
export const testNameReducer = (state = testNameInitialState, action) => {
    switch (action.type) {
        case SET_TEST_NAME:
            return {
                ...state,
                testName: action.payload,
            };
        default:
            return state;
    }
};

const subTestNameInitialState = { subTestName: null };
export const subTestNameReducer = (state = subTestNameInitialState, action) => {
    switch (action.type) {
        case SET_SUB_TEST_NAME:
            return {
                ...state,
                subTestName: action.payload,
            };
        default:
            return state;
    }
};

const testStepNameInitialState = { testStepName: null };
export const testStepNameReducer = (state = testStepNameInitialState, action) => {
    switch (action.type) {
        case SET_TEST_STEP_NAME:
            return {
                ...state,
                testStepName: action.payload,
            };
        default:
            return state;
    }
};
