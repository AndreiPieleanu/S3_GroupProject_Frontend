import AxiosAPI from "../../utils/AxiosAPI";
import EndPoints from "../../utils/EndPoints";

export const FETCH_SUBTEST_DATA_REQUEST = 'FETCH_SUBTEST_DATA_REQUEST';
export const FETCH_SUBTEST_DATA_SUCCESS = 'FETCH_SUBTEST_DATA_SUCCESS';
export const FETCH_SUBTEST_DATA_FAILURE = 'FETCH_SUBTEST_DATA_FAILURE';
export const fetchSubTestDataRequest = () => ({
    type: FETCH_SUBTEST_DATA_REQUEST
});

export const fetchSubTestDataSuccess = (subTestData) => ({
    type: FETCH_SUBTEST_DATA_SUCCESS,
    payload: subTestData
});

export const fetchSubTestDataFailure = (error) => ({
    type: FETCH_SUBTEST_DATA_FAILURE,
    payload: error
});

export const fetchSubTestData = (subTestId) => {
    const endpointUrl = EndPoints.TEST_STEP+EndPoints.SUBTEST + "/" + subTestId;
    console.log(endpointUrl)
    return async (dispatch) => {
        dispatch(fetchSubTestDataRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestData = response.data;

            dispatch(fetchSubTestDataSuccess(subTestData));
        } catch (error) {
            dispatch(fetchSubTestDataFailure(error.message));
        }
    };
};