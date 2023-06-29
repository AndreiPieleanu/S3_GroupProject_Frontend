import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_TESTSET_RESULT_REQUEST = 'FETCH_TESTSET_RESULT_REQUEST';
export const FETCH_TESTSET_RESULT_SUCCESS = 'FETCH_TESTSET_RESULT_SUCCESS';
export const FETCH_TESTSET_RESULT_FAILURE = 'FETCH_TESTSET_RESULT_FAILURE';

export const fetchTestsetResultRequest = () => ({
    type: FETCH_TESTSET_RESULT_REQUEST
});

export const fetchTestsetResultSuccess = (commits) => ({
    type: FETCH_TESTSET_RESULT_SUCCESS,
    payload: commits
});

export const fetchTestsetResultFailure = (error) => ({
    type: FETCH_TESTSET_RESULT_FAILURE,
    payload: error
});

export const fetchTestSetResult = (resultId, commitId) => {
    const endpointUrl = EndPoints.TEST_SETS+EndPoints.COMMITS+"/"+commitId+EndPoints.RESULTS+"/"+resultId
    console.log(endpointUrl)
    return async (dispatch) => {
        dispatch(fetchTestsetResultRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestData = response.data;
            dispatch(fetchTestsetResultSuccess(subTestData));
        } catch (error) {
            dispatch(fetchTestsetResultFailure(error.message));
        }
    };
};