import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_COMMITS_BY_ERROR_REQUEST = 'FETCH_FETCH_COMMITS_BY_ERROR_REQUEST_BY_ERROR_REQUEST';
export const FETCH_COMMITS_BY_ERROR_SUCCESS = 'FETCH_FETCH_COMMITS_BY_ERROR_REQUEST_BY_ERROR_SUCCESS';
export const FETCH_COMMITS_BY_ERROR_FAILURE = 'FETCH_COMMITS_BY_ERROR_FAILURE';

export const fetchCommitsByErrorRequest = () => ({
    type: FETCH_COMMITS_BY_ERROR_REQUEST
});

export const fetchCommitsByErrorSuccess = (testStepData) => ({
    type: FETCH_COMMITS_BY_ERROR_SUCCESS,
    payload: testStepData
});

export const fetchCommitsByErrorFailure = (error) => ({
    type: FETCH_COMMITS_BY_ERROR_FAILURE,
    payload: error
});

export const fetchCommitsByErrorType = (branchId,errorCode) => {
    const endpointUrl = EndPoints.COMMITS+EndPoints.BRANCH + "/" + branchId + EndPoints.ERRORS+"/"+ errorCode;
    return async (dispatch) => {
        dispatch(fetchCommitsByErrorRequest());

        try {
            const response = await AxiosAPI.get(endpointUrl);
            const commitsData = response.data;
            dispatch(fetchCommitsByErrorSuccess(commitsData));
        } catch (error) {
            dispatch(fetchCommitsByErrorFailure(error.message));
        }
    };
};