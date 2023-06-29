import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_TEST_SET_COUNT_REQUEST = 'FETCH_TEST_SET_COUNT_REQUEST';
export const FETCH_TEST_SET_COUNT_SUCCESS = 'FETCH_TEST_SET_COUNT_SUCCESS';
export const FETCH_TEST_SET_COUNT_FAILURE = 'FETCH_TEST_SET_COUNT_FAILURE';
export const fetchTestSetCountRequest = () => ({
    type: FETCH_TEST_SET_COUNT_REQUEST
});
export const fetchTestSetCountSuccess = (testSetCount) => ({
    type: FETCH_TEST_SET_COUNT_SUCCESS,
    payload: testSetCount
});
export const fetchTestSetCountFailure = (error) => ({
    type: FETCH_TEST_SET_COUNT_FAILURE,
    payload: error
});
export const fetchTestSetCountData = (setId) => {
    let endpointUrl = EndPoints.TEST_SETS + "/" + setId + EndPoints.COUNT;
    return async (dispatch) => {
        dispatch(fetchTestSetCountRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testSetCount = await response.data;
            dispatch(fetchTestSetCountSuccess(testSetCount));
        } catch (error) {
            dispatch(fetchTestSetCountFailure(error.message));
        }
    };
};