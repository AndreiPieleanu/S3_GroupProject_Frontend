import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_SUBTEST_COUNT_REQUEST = 'FETCH_SUBTEST_COUNT_REQUEST';
export const FETCH_SUBTEST_COUNT_SUCCESS = 'FETCH_SUBTEST_COUNT_SUCCESS';
export const FETCH_SUBTEST_COUNT_FAILURE = 'FETCH_SUBTEST_COUNT_FAILURE';
export const fetchSubTestCountRequest = () => ({
    type: FETCH_SUBTEST_COUNT_REQUEST
});

export const fetchSubTestCountSuccess = (subTestCount) => ({
    type: FETCH_SUBTEST_COUNT_SUCCESS,
    payload: subTestCount
});

export const fetchSubTestCountFailure = (error) => ({
    type: FETCH_SUBTEST_COUNT_FAILURE,
    payload: error
});
export const fetchSubTestCountData = (subTestId) => {
    let endpointUrl = EndPoints.SUBTESTS + "/" + subTestId + EndPoints.COUNT;

    return async (dispatch) => {
        dispatch(fetchSubTestCountRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestCount = await response.data;
            dispatch(fetchSubTestCountSuccess(subTestCount));
        } catch (error) {
            dispatch(fetchSubTestCountFailure(error.message));
        }
    };
};