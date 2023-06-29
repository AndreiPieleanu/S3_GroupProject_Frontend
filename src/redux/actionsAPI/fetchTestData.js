import AxiosAPI from "../../utils/AxiosAPI";
import EndPoints from "../../utils/EndPoints";

export const FETCH_TEST_DATA_REQUEST = 'FETCH_TEST_DATA_REQUEST';
export const FETCH_TEST_DATA_SUCCESS = 'FETCH_TEST_DATA_SUCCESS';
export const FETCH_TEST_DATA_FAILURE = 'FETCH_TEST_DATA_FAILURE';
export const fetchTestDataRequest = () => ({
    type: FETCH_TEST_DATA_REQUEST
});

export const fetchTestDataSuccess = (testData) => ({
    type: FETCH_TEST_DATA_SUCCESS,
    payload: testData
});

export const fetchTestDataFailure = (error) => ({
    type: FETCH_TEST_DATA_FAILURE,
    payload: error
});

export const fetchTestData = (testId,refresh =false) => {
    return async (dispatch) => {
        dispatch(fetchTestDataRequest());
const endpointUrl=EndPoints.SUBTESTS + "/test" + "/" + testId;
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testData = response.data;

            dispatch(fetchTestDataSuccess(testData));
        } catch (error) {
            dispatch(fetchTestDataFailure(error.message));
        }
    };
};