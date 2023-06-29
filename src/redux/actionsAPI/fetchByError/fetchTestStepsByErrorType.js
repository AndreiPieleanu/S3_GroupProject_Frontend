import AxiosAPI from "../../../utils/AxiosAPI";
import EndPoints from "../../../utils/EndPoints";

export const FETCH_TEST_STEPS_BY_ERROR_REQUEST = 'FETCH_TEST_STEPS_BY_ERROR_REQUEST';
export const FETCH_TEST_STEPS_BY_ERROR_SUCCESS = 'FETCH_TEST_STEPS_BY_ERROR_SUCCESS';
export const FETCH_TEST_STEPS_BY_ERROR_FAILURE = 'FETCH_TEST_STEPS_BY_ERROR_FAILURE';

export const fetchTestStepsByErrorRequest = () => ({
    type: FETCH_TEST_STEPS_BY_ERROR_REQUEST
});

export const fetchTestStepsByErrorSuccess = (testStepData) => ({
    type: FETCH_TEST_STEPS_BY_ERROR_SUCCESS,
    payload: testStepData
});

export const fetchTestStepsByErrorFailure = (error) => ({
    type: FETCH_TEST_STEPS_BY_ERROR_FAILURE,
    payload: error
});

export const fetchTestStepsByErrorType = (errorCode, subtestId) => {
    const endpointUrl = EndPoints.TEST_STEP + "/error_type/" + errorCode + EndPoints.SUBTESTS + "/" + subtestId;
    return async (dispatch) => {
        dispatch(fetchTestStepsByErrorRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestData = response.data;
            dispatch(fetchTestStepsByErrorSuccess(subTestData));
        } catch (error) {
            dispatch(fetchTestStepsByErrorFailure(error.message));
        }
    };
};