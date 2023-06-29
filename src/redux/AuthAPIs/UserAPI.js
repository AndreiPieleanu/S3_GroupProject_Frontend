import axios from "axios";
import TokenManager from "./TokenManager";

const UserAPI = {
    getUser: (userId) => axios.get(`http://localhost:8080/users/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        })
        .then(response => response.data)
        .catch(error => {
            alert("Your session has expired! Login back!");
            TokenManager.clear();
            window.location.reload();
            return {};
        })
}

export default UserAPI;