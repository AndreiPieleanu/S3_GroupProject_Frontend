import {
    FETCH_BRANCH_RESULT_COUNT_FAILURE,
    FETCH_BRANCH_RESULT_COUNT_REQUEST,
    FETCH_BRANCH_RESULT_COUNT_SUCCESS
} from "../actionsAPI/fetchCount/fetchBranchResultCountData";
import {
    FETCH_TEST_STEP_COUNT_FAILURE,
    FETCH_TEST_STEP_COUNT_REQUEST,
    FETCH_TEST_STEP_COUNT_SUCCESS
} from "../actionsAPI/fetchCount/fetchCountOfTestStepPerSubTest";
import {
    FETCH_SUBTEST_COUNT_FAILURE,
    FETCH_SUBTEST_COUNT_REQUEST,
    FETCH_SUBTEST_COUNT_SUCCESS
} from "../actionsAPI/fetchCount/fetchCountOfSubTestPerTest";
import {
    FETCH_TEST_SET_COUNT_FAILURE,
    FETCH_TEST_SET_COUNT_REQUEST,
    FETCH_TEST_SET_COUNT_SUCCESS
} from "../actionsAPI/fetchCount/fetchCountOfTestSetsPerCommit";
import {
    FETCH_TEST_COUNT_FAILURE,
    FETCH_TEST_COUNT_REQUEST,
    FETCH_TEST_COUNT_SUCCESS
} from "../actionsAPI/fetchCount/fetchCountOfTestPerTestSet";

export const branchResultCountInitialState = {branchResultCount: {}, isLoading: false, error: ""};
export const branchResultCountReducer = (state = branchResultCountInitialState, action) => {
    switch (action.type) {
        case FETCH_BRANCH_RESULT_COUNT_REQUEST:
            console.log("Fetching branch data...");
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_BRANCH_RESULT_COUNT_SUCCESS:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                branchResultCount: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCH_BRANCH_RESULT_COUNT_FAILURE:
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

const initialTestStepCountState = {
    count: null,
    loading: false,
    error: null
};

export const testStepCountReducer = (state = initialTestStepCountState, action) => {
    switch (action.type) {
        case FETCH_TEST_STEP_COUNT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TEST_STEP_COUNT_SUCCESS:
            return {
                ...state,
                count: action.payload,
                loading: false,
                error: null
            };
        case FETCH_TEST_STEP_COUNT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


const initialSubTestCountState = {
    count: null,
    loading: false,
    error: null
};

export const subTestCountReducer = (state = initialSubTestCountState, action) => {
    switch (action.type) {
        case FETCH_SUBTEST_COUNT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SUBTEST_COUNT_SUCCESS:
            return {
                ...state,
                count: action.payload,
                loading: false,
                error: null
            };
        case FETCH_SUBTEST_COUNT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialTestCountState = {
    count: null,
    loading: false,
    error: null
};

export const testCountReducer = (state = initialTestCountState, action) => {
    switch (action.type) {
        case FETCH_TEST_COUNT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TEST_COUNT_SUCCESS:
            return {
                ...state,
                count: action.payload,
                loading: false,
                error: null
            };
        case FETCH_TEST_COUNT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


const initialTestSetCountState = {
    count: null,
    loading: false,
    error: null
};

export const testSetCountReducer = (state = initialTestSetCountState, action) => {
    switch (action.type) {
        case FETCH_TEST_SET_COUNT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TEST_SET_COUNT_SUCCESS:
            return {
                ...state,
                count: action.payload,
                loading: false,
                error: null
            };
        case FETCH_TEST_SET_COUNT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};



