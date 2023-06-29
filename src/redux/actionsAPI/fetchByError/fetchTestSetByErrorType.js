import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_TESTSET_ERROR_REQUEST = 'FETCH_TESTSET_ERROR_REQUEST';
export const FETCH_TESTSET_ERROR_SUCCESS = 'FETCH_TESTSET_ERROR_SUCCESS';
export const FETCH_TESTSET_ERROR_FAILURE = 'FETCH_TESTSET_ERROR_FAILURE';

export const fetchTestsetErrorRequest = () => ({
    type: FETCH_TESTSET_ERROR_REQUEST
});

export const fetchTestsetErrorSuccess = (testsetErrorData) => ({
    type: FETCH_TESTSET_ERROR_SUCCESS,
    payload: testsetErrorData
});

export const fetchTestsetErrorFailure = (error) => ({
    type: FETCH_TESTSET_ERROR_FAILURE,
    payload: error
});

export const fetchTestsetError = (resultId, commitId) => {
    const endpointUrl = EndPoints.TEST_SETS+EndPoints.COMMITS+"/"+commitId+EndPoints.ERRORS+"/"+resultId
    console.log(endpointUrl)
    return async (dispatch) => {
        dispatch(fetchTestsetErrorRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testSetsData = response.data;
            dispatch(fetchTestsetErrorSuccess(testSetsData));
        } catch (error) {
            dispatch(fetchTestsetErrorFailure(error.message));
        }
    };
};