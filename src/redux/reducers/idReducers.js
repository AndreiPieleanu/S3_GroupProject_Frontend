/** //////////////////////////////////////////////////////ID REDUCERS/////////////////////////////////////////////////////////
// This defines the initial state of the branch ID for the app. Set as null by default, can be changed to have default views,
// such as default public branch or similar (app general behaviour as of 3/5/23 is to fetch when the state of the id changes).
import {SET_BRANCH_ID, SET_COMMIT_ID, SET_SUBTEST_ID, SET_TEST_ID, SET_TEST_SET_ID} from "./actions";**/
import {SET_BRANCH_ID, SET_COMMIT_ID, SET_SUBTEST_ID, SET_TEST_ID, SET_TEST_SET_ID} from "../actions";

const branchIdInitialState = {branchId: null}
export const branchIdReducer = (state = branchIdInitialState, action) => {
    switch (action.type) {
        // When a SET_BRANCH_ID action is dispatched, update the branch ID
        case SET_BRANCH_ID:
            return {
                ...state,
                branchId: action.payload,
            };
        default:
            // If no matching action type is found, return the existing state
            return state;
    }
};
const testSetIdInitialState = {testSetId: null}
export const testSetIdReducer = (state = testSetIdInitialState, action) => {
    switch (action.type) {
        case SET_TEST_SET_ID:
            return {
                ...state,
                testSetId: action.payload,
            };
        default:
            return state;
    }
};
const testIdInitialState = {testId: null}
export const testIdReducer = (state = testIdInitialState, action) => {
    switch (action.type) {
        case SET_TEST_ID:
            return {
                ...state,
                testId: action.payload,
            };
        default:
            return state;
    }
};
const subTestIdInitialState = {subTestId: null}
export const subTestIdReducer = (state = subTestIdInitialState, action) => {
    switch (action.type) {
        case SET_SUBTEST_ID:
            return {
                ...state,
                subTestId: action.payload,
            };
        default:
            return state;
    }
};
const commitIdInitialState = {commitId: null}
export const commitIdReducer = (state = commitIdInitialState, action) => {
    switch (action.type) {
        case SET_COMMIT_ID:
            return {
                ...state,
                commitId: action.payload,
            };
        default:
            return state;
    }
};