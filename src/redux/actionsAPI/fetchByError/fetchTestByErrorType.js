import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_TEST_ERROR_REQUEST = 'FETCH_TEST_ERROR_REQUEST';
export const    FETCH_TEST_ERROR_SUCCESS = 'FETCH_TEST_ERROR_SUCCESS';
export const FETCH_TEST_ERROR_FAILURE = 'FETCH_TEST_ERROR_FAILURE';

export const fetchTestErrorRequest = () => ({
    type: FETCH_TEST_ERROR_REQUEST
});

export const fetchTestErrorSuccess = (testErrorData) => ({
    type: FETCH_TEST_ERROR_SUCCESS,
    payload: testErrorData
});

export const fetchTestErrorFailure = (error) => ({
    type: FETCH_TEST_ERROR_FAILURE,
    payload: error
});

export const fetchTestError = (resultId, commitId) => {
    const endpointUrl = EndPoints.TEST_RESULT+EndPoints.TEST_SET+"/"+commitId+EndPoints.ERRORS+"/"+resultId
    console.log(endpointUrl)
    return async (dispatch) => {
        dispatch(fetchTestErrorRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestData = response.data;
            dispatch(fetchTestErrorSuccess(subTestData));
        } catch (error) {
            dispatch(fetchTestErrorFailure(error.message));
        }
    };
};