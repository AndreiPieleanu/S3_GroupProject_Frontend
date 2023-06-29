import {applyMiddleware, createStore} from 'redux';
import rootReducer from "./reducer";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 - The createStore function from Redux creates a store that holds the state of the application.
 - The store is created by passing a reducer function to it.
 - The reducer function takes the current state and an action as arguments and returns a new state.
 - The thunk middleware allows the action creators to return a function instead of an action object.
 - This is used for asynchronous operations like fetching data from the API.
 - The composeWithDevTools function is pure wild magic of the redux library that gives support to redux devtools browser extension
 - This file exports the created store object, which can be used by other parts of the application to access the state or dispatch actions to it.
 **/

//TODO: add "constant refresh middleware", see https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
const autoRefreshMiddleware = (refreshInterval) => ({ dispatch }) => (next) => (action) => {
    if (action.refresh) {
        // Start the auto-refresh interval
        const intervalId = setInterval(() => {
            dispatch(action); // Disable refresh flag for subsequent calls
        }, refreshInterval);

        // Attach the intervalId to the action for later reference
        action.intervalId = intervalId;
    }

    return next(action);
};
const middlewares = [];


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware,autoRefreshMiddleware(5000)))
);
export default store;