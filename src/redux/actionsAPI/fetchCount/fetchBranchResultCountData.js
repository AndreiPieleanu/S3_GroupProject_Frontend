import AxiosAPI from "../../../utils/AxiosAPI";
import EndPoints from "../../../utils/EndPoints";

export const FETCH_BRANCH_RESULT_COUNT_REQUEST = 'FETCH_BRANCH_DATA_REQUEST';
export const FETCH_BRANCH_RESULT_COUNT_SUCCESS = 'FETCH_BRANCH_DATA_SUCCESS';
export const FETCH_BRANCH_RESULT_COUNT_FAILURE = 'FETCH_BRANCH_DATA_FAILURE';

export const fetchBranchResultCountRequest = () => ({
    type: FETCH_BRANCH_RESULT_COUNT_REQUEST
});
export const fetchBranchResultCountSuccess = (branchResultCount) => ({
    type: FETCH_BRANCH_RESULT_COUNT_SUCCESS,
    payload: branchResultCount
});
export const fetchBranchResultCountFailure = (error) => ({
    type: FETCH_BRANCH_RESULT_COUNT_FAILURE,
    payload: error
});

export const fetchBranchResultCountData = (branchId) => {
    let endpointUrl = EndPoints.BRANCHES+"/"+branchId+EndPoints.COUNT;
console.log(branchId)
    return async (dispatch) => {
        dispatch(fetchBranchResultCountRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            console.log("HERE!!",response)

            const branchResultCount = await response.data;
            dispatch(fetchBranchResultCountSuccess(branchResultCount));
        } catch (error) {
            dispatch(fetchBranchResultCountFailure(error.message));
        }
    };
};