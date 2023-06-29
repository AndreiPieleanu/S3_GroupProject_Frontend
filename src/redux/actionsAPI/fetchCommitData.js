import AxiosAPI from "../../utils/AxiosAPI";
import EndPoints from "../../utils/EndPoints";

export const FETCH_COMMIT_DATA_REQUEST = 'FETCH_COMMIT_DATA_REQUEST';
export const FETCH_COMMIT_DATA_SUCCESS = 'FETCH_COMMIT_DATA_SUCCESS';
export const FETCH_COMMIT_DATA_FAILURE = 'FETCH_COMMIT_DATA_FAILURE';

export const fetchCommitDataRequest = () => ({
    type: FETCH_COMMIT_DATA_REQUEST
});

export const fetchCommitDataSuccess = (commitData) => ({
    type: FETCH_COMMIT_DATA_SUCCESS,
    payload: commitData
});

export const fetchCommitDataFailure = (error) => ({
    type: FETCH_COMMIT_DATA_FAILURE,
    payload: error
});
//TODO endpoint generator
export const fetchCommitData = (commitId,refresh =false) => {
    let endpointUrl = EndPoints.TEST_SETS+ EndPoints.COMMITS+"/"+commitId;
    return async (dispatch) => {
        dispatch(fetchCommitDataRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const commitData = response.data;
            dispatch(fetchCommitDataSuccess(commitData));
        } catch (error) {
            dispatch(fetchCommitDataFailure(error.message));
        }
    };
};