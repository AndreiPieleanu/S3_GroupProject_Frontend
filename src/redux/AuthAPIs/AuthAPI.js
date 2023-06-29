import axios from "axios";
import TokenManager from "./TokenManager";

const AuthAPI = {
    login: (email, password) => axios.post('http://localhost:8080/login', { email, password })
        .then(response => response.data.accessToken)
        .then(accessToken => TokenManager.setAccessToken(accessToken))
}

export default AuthAPI;