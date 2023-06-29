import EndPoints from "../../../utils/EndPoints";
import AxiosAPI from "../../../utils/AxiosAPI";

export const FETCH_COMMITS_BY_VERSION_REQUEST = 'FETCH_COMMITS_BY_VERSION_REQUEST';
export const FETCH_COMMITS_BY_VERSION_SUCCESS = 'FETCH_COMMITS_BY_VERSION_SUCCESS';
export const FETCH_COMMITS_BY_VERSION_FAILURE = 'FETCH_COMMITS_BY_VERSION_FAILURE';

export const fetchCommitsByVersionRequest = () => ({
    type: FETCH_COMMITS_BY_VERSION_REQUEST
});

export const fetchCommitsByVersionSuccess = (commits) => ({
    type: FETCH_COMMITS_BY_VERSION_SUCCESS,
    payload: commits
});

export const fetchCommitsByVersionFailure = (error) => ({
    type: FETCH_COMMITS_BY_VERSION_FAILURE,
    payload: error
});

export const fetchCommitsByVersion = (branchId, versionCode) => {
    const endpointUrl = EndPoints.COMMITS + EndPoints.BRANCH + "/" + branchId + EndPoints.VERSION +"/"+ versionCode;
    return async (dispatch) => {
        dispatch(fetchCommitsByVersionRequest());
console.log(endpointUrl)
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const commits = response.data;
            dispatch(fetchCommitsByVersionSuccess(commits));
        } catch (error) {
            dispatch(fetchCommitsByVersionFailure(error.message));
        }
    };
};