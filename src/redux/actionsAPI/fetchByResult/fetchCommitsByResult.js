import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_COMMITS_RESULT_REQUEST = 'FETCH_COMMITS_RESULT_REQUEST';
export const FETCH_COMMITS_RESULT_SUCCESS = 'FETCH_COMMITS_RESULT_SUCCESS';
export const FETCH_COMMITS_RESULT_FAILURE = 'FETCH_COMMITS_RESULT_FAILURE';

export const fetchCommitsResultRequest = () => ({
    type: FETCH_COMMITS_RESULT_REQUEST
});

export const fetchCommitsResultSuccess = (branchData) => ({
    type: FETCH_COMMITS_RESULT_SUCCESS,
    payload: branchData
});

export const fetchCommitsResultFailure = (error) => ({
    type: FETCH_COMMITS_RESULT_FAILURE,
    payload: error
});

export const fetchCommitsResult = (resultCode, branchId) => {
    const endpointUrl = EndPoints.COMMITS+EndPoints.BRANCH + "/" + branchId + EndPoints.RESULTS +"/"+ resultCode;
    console.log("HERE BRO",endpointUrl)
    return async (dispatch) => {
        dispatch(fetchCommitsResultRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const subTestData = response.data;
            dispatch(fetchCommitsResultSuccess(subTestData));
        } catch (error) {
            dispatch(fetchCommitsResultFailure(error.message));
        }
    };
};