import AxiosAPI from "../../utils/AxiosAPI";
import TokenManager from "../AuthAPIs/TokenManager";

export const FETCH_BRANCHES_REQUEST = 'FETCH_BRANCHES_REQUEST';
export const FETCH_BRANCHES_SUCCESS = 'FETCH_BRANCHES_SUCCESS';
export const FETCH_BRANCHES_FAILURE = 'FETCH_BRANCHES_FAILURE';

export const fetchBranchesRequest = () => ({

    type: FETCH_BRANCHES_REQUEST
});

export const fetchBranchesSuccess = (branches) => ({
    type: FETCH_BRANCHES_SUCCESS,
    payload: branches
});

export const fetchBranchesFailure = (error) => ({
    type: FETCH_BRANCHES_FAILURE,
    payload: error
});

export const fetchBranches = (refresh =false) => {

    return async (dispatch) => {
        dispatch(fetchBranchesRequest());
        try {
            //TODO add private branches to fetch if logged in
            let response;
            if (TokenManager.getClaims()) {
                console.log("sto qua zio boia")
                const userId = TokenManager.getClaims()?.userId;
                const token = TokenManager.getAccessToken();
                console.log("ziocan",userId,token)
                response = await AxiosAPI.get(`branches/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}`}
                });
                console.log("resp",response)
            } else {
                response = await AxiosAPI.get("/branches/public");
            }
            const branches = response.data;
            dispatch(fetchBranchesSuccess(branches));
        } catch (error) {
            dispatch(fetchBranchesFailure(error.message));
        }
    };
};
