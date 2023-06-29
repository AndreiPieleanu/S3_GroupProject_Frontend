
import AxiosAPI from "../../utils/AxiosAPI";
import EndPoints from "../../utils/EndPoints";

export const FETCH_BRANCH_DATA_REQUEST = 'FETCH_BRANCH_DATA_REQUEST';
export const FETCH_BRANCH_DATA_SUCCESS = 'FETCH_BRANCH_DATA_SUCCESS';
export const FETCH_BRANCH_DATA_FAILURE = 'FETCH_BRANCH_DATA_FAILURE';

export const fetchBranchDataRequest = () => ({
    type: FETCH_BRANCH_DATA_REQUEST
});

export const fetchBranchDataSuccess = (branchData) => ({
    type: FETCH_BRANCH_DATA_SUCCESS,
    payload: branchData
});

export const fetchBranchDataFailure = (error) => ({
    type: FETCH_BRANCH_DATA_FAILURE,
    payload: error
});
export const fetchBranchData = (branchId) => {
    let endpointUrl = EndPoints.COMMITS+EndPoints.BRANCH+"/"+branchId;
    console.log(endpointUrl)
    return async (dispatch) => {
        dispatch(fetchBranchDataRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            console.log("FetchBranchData response:",response)
            const branchData = await response.data;
            dispatch(fetchBranchDataSuccess(branchData));
        } catch (error) {
            dispatch(fetchBranchDataFailure(error.message));
        }
    };
};
