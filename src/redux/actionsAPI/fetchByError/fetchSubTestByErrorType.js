import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_SUBTEST_ERROR_REQUEST = 'FETCH_SUBTEST_ERROR_REQUEST';
export const FETCH_SUBTEST_ERROR_SUCCESS = 'FETCH_SUBTEST_ERROR_SUCCESS';
export const FETCH_SUBTEST_ERROR_FAILURE = 'FETCH_SUBTEST_ERROR_FAILURE';

export const fetchSubtestErrorRequest = () => ({
    type: FETCH_SUBTEST_ERROR_REQUEST
});

export const fetchSubtestErrorSuccess = (subtestErrorData) => ({
    type: FETCH_SUBTEST_ERROR_SUCCESS,
    payload: subtestErrorData
});

export const fetchSubtestErrorFailure = (error) => ({
    type: FETCH_SUBTEST_ERROR_FAILURE,
    payload: error
});

export const fetchSubtestError = (resultId, testId) => {
    const endpointUrl = EndPoints.SUBTESTS+EndPoints.TEST+"/"+testId+EndPoints.ERRORS+"/"+resultId
    console.log(endpointUrl)
    return async (dispatch) => {
        dispatch(fetchSubtestErrorRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestData = response.data;
            dispatch(fetchSubtestErrorSuccess(subTestData));
        } catch (error) {
            dispatch(fetchSubtestErrorFailure(error.message));
        }
    };
};