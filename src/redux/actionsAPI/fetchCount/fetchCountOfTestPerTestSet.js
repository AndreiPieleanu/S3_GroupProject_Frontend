import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_TEST_COUNT_REQUEST = 'FETCH_TEST_COUNT_REQUEST';
export const FETCH_TEST_COUNT_SUCCESS = 'FETCH_TEST_COUNT_SUCCESS';
export const FETCH_TEST_COUNT_FAILURE = 'FETCH_TEST_COUNT_FAILURE';
export const fetchTestCountRequest = () => ({
    type: FETCH_TEST_COUNT_REQUEST
});

export const fetchTestCountSuccess = (testCount) => ({
    type: FETCH_TEST_COUNT_SUCCESS,
    payload: testCount
});

export const fetchTestCountFailure = (error) => ({
    type: FETCH_TEST_COUNT_FAILURE,
    payload: error
});
export const fetchTestCountData = (testId) => {
    let endpointUrl = EndPoints.TEST  + "/" + testId + EndPoints.COUNT;

    return async (dispatch) => {
        dispatch(fetchTestCountRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testCount = await response.data;
            dispatch(fetchTestCountSuccess(testCount));
        } catch (error) {
            dispatch(fetchTestCountFailure(error.message));
        }
    };
};