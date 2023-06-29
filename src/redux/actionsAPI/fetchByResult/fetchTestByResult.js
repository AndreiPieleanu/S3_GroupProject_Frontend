import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_TEST_RESULT_REQUEST = 'FETCH_TEST_RESULT_REQUEST';
export const FETCH_TEST_RESULT_SUCCESS = 'FETCH_TEST_RESULT_SUCCESS';
export const FETCH_TEST_RESULT_FAILURE = 'FETCH_TEST_RESULT_FAILURE';

export const fetchTestResultRequest = () => ({
    type: FETCH_TEST_RESULT_REQUEST
});

export const fetchTestResultSuccess = (testData) => ({
    type: FETCH_TEST_RESULT_SUCCESS,
    payload: testData
});

export const fetchTestResultFailure = (error) => ({
    type: FETCH_TEST_RESULT_FAILURE,
    payload: error
});

export const fetchTestResult = (resultId, testId) => {
    const endpointUrl = EndPoints.TEST_RESULT+EndPoints.TEST_SET+"/"+testId+ EndPoints.RESULTS+"/"+resultId
    console.log(endpointUrl,"IMHERE")
    return async (dispatch) => {
        dispatch(fetchTestResultRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testResult = response.data;
            dispatch(fetchTestResultSuccess(testResult));
        } catch (error) {
            dispatch(fetchTestResultFailure(error.message));
        }
    };
};