import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_TEST_STEP_COUNT_REQUEST = 'FETCH_TEST_STEP_COUNT_REQUEST';
export const FETCH_TEST_STEP_COUNT_SUCCESS = 'FETCH_TEST_STEP_COUNT_SUCCESS';
export const FETCH_TEST_STEP_COUNT_FAILURE = 'FETCH_TEST_STEP_COUNT_FAILURE';
export const fetchTestStepCountRequest = () => ({
    type: FETCH_TEST_STEP_COUNT_REQUEST
});
export const fetchTestStepCountSuccess = (testStepCount) => ({
    type: FETCH_TEST_STEP_COUNT_SUCCESS,
    payload: testStepCount
});
export const fetchTestStepCountFailure = (error) => ({
    type: FETCH_TEST_STEP_COUNT_FAILURE,
    payload: error
});
export const fetchTestStepCountData = (stepId) => {
    let endpointUrl = EndPoints.TEST_STEP + EndPoints.SUBTEST+ "/" + stepId + EndPoints.COUNT;
    return async (dispatch) => {
        dispatch(fetchTestStepCountRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testStepCount = await response.data;
            dispatch(fetchTestStepCountSuccess(testStepCount));
        } catch (error) {
            dispatch(fetchTestStepCountFailure(error.message));
        }
    };
};