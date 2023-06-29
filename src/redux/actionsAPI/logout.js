import AxiosAPI from "../../utils/AxiosAPI";
import EndPoints from "../../utils/EndPoints";
import jwt_decode from 'jwt-decode';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const logoutFailure = (error) => ({
    type: LOGOUT_FAILURE,
    payload: error
});

export const logout = () => {
    return async (dispatch) => {
        dispatch(logoutRequest());
        try {
            dispatch(logoutSuccess());
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");

        } catch (error) {
            dispatch(logoutFailure(error.message));
        }
    };
};