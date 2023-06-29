import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_SUBTEST_RESULT_REQUEST = 'FETCH_SUBTEST_RESULT_REQUEST';
export const FETCH_SUBTEST_RESULT_SUCCESS = 'FETCH_SUBTEST_RESULT_SUCCESS';
export const FETCH_SUBTEST_RESULT_FAILURE = 'FETCH_SUBTEST_RESULT_FAILURE';

export const fetchSubtestResultRequest = () => ({
    type: FETCH_SUBTEST_RESULT_REQUEST
});

export const fetchSubtestResultSuccess = (subtestResultData) => ({
    type: FETCH_SUBTEST_RESULT_SUCCESS,
    payload: subtestResultData
});

export const fetchSubtestResultFailure = (error) => ({
    type: FETCH_SUBTEST_RESULT_FAILURE,
    payload: error
});

export const fetchSubtestResult = (resultId, testId) => {
    const endpointUrl = EndPoints.SUBTESTS+EndPoints.TEST+"/"+testId+ EndPoints.RESULTS+"/"+resultId
    console.log("STO QUA:",endpointUrl)
    return async (dispatch) => {
        dispatch(fetchSubtestResultRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testData = response.data;
            dispatch(fetchSubtestResultSuccess(testData));
        } catch (error) {
            dispatch(fetchSubtestResultFailure(error.message));
        }
    };
};