import AxiosAPI from "../../utils/AxiosAPI";

export const FETCH_TEST_ERRORS_REQUEST = 'FETCH_TEST_ERRORS_REQUEST';
export const FETCH_TEST_ERRORS_SUCCESS = 'FETCH_TEST_ERRORS_SUCCESS';
export const FETCH_TEST_ERRORS_FAILURE = 'FETCH_TEST_ERRORS_FAILURE';

export const fetchTestErrorsRequest = () => ({

    type: FETCH_TEST_ERRORS_REQUEST
});

export const fetchTestErrorsSuccess = (testErrors) => ({
    type: FETCH_TEST_ERRORS_SUCCESS,
    payload: testErrors
});

export const fetchTestErrorsFailure = (error) => ({
    type: FETCH_TEST_ERRORS_FAILURE,
    payload: error
});

export const fetchTestErrors = () => {

    return async (dispatch) => {
        dispatch(fetchTestErrorsRequest());

        try {
            const response = await AxiosAPI.get("/testErrors");
            const testErrors = response.data;
            dispatch(fetchTestErrorsSuccess(testErrors));
        } catch (error) {
            dispatch(fetchTestErrorsFailure(error.message));
        }
    };
};