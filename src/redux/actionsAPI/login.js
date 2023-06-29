import AxiosAPI from "../../utils/AxiosAPI";
import EndPoints from "../../utils/EndPoints";
import jwt_decode from 'jwt-decode';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const login = (email,password) => {
    let endpointUrl = EndPoints.LOGIN;
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await AxiosAPI.post(endpointUrl,email,password);

            const token = response.data;
            console.log(response);

            if (token) {
                dispatch(loginSuccess(token));
                const decoded_response = jwt_decode(token);
                localStorage.setItem("token", token);
                localStorage.setItem("role", decoded_response.role);
                localStorage.setItem("userId", decoded_response.userId);
            } else {
                dispatch(loginFailure("Invalid credentials. Please try again."));
            }
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };
};
