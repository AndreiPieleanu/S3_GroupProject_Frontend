import AxiosAPI from "../../../utils/AxiosAPI";
import EndPoints from "../../../utils/EndPoints";

export const FETCH_TEST_STEPS_BY_RESULT_REQUEST = 'FETCH_TEST_STEPS_BY_RESULT_REQUEST';
export const FETCH_TEST_STEPS_BY_RESULT_SUCCESS = 'FETCH_TEST_STEPS_BY_RESULT_SUCCESS';
export const FETCH_TEST_STEPS_BY_RESULT_FAILURE = 'FETCH_TEST_STEPS_BY_RESULT_FAILURE';

export const fetchTestStepsByResultRequest = () => ({
    type: FETCH_TEST_STEPS_BY_RESULT_REQUEST
});

export const fetchTestStepsByResultSuccess = (testStepData) => ({
    type: FETCH_TEST_STEPS_BY_RESULT_SUCCESS,
    payload: testStepData
});

export const fetchTestStepsByResultFailure = (error) => ({
    type: FETCH_TEST_STEPS_BY_RESULT_FAILURE,
    payload: error
});

export const fetchTestStepsByResultType = (resultCode,subTestId) => {
    const endpointUrl = EndPoints.TEST_STEP + "/result_type/" + resultCode+EndPoints.SUBTESTS+"/"+subTestId;
    return async (dispatch) => {
        dispatch(fetchTestStepsByResultRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestData = response.data;
            dispatch(fetchTestStepsByResultSuccess(subTestData));
        } catch (error) {
            dispatch(fetchTestStepsByResultFailure(error.message));
        }
    };
};



