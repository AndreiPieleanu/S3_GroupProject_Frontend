import axios from "axios";
import TokenManager from "../../AuthAPIs/TokenManager";

const branchesURL = "http://localhost:8080/branches";

export const branchCommands = {
    getBranchResults: () => axios.get(`${branchesURL}/get-branch-results`)
        .then(response => response.data)
        .catch(error => console.log(error)),
    getStats: () => axios.get(`${branchesURL}/get-stats`)
        .then(response => response.data)
        .catch(error => console.log(error)),
    getStatsAuthed: async () => {
        try {
            const response = await axios.get(`${branchesURL}/get-stats/${TokenManager.getClaims()?.userId}`, {
                headers: {
                    Authorization: `Bearer ${TokenManager.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getBranchResultsAuthed: async (userId) => {
        try {
            const response = await axios.get(`${branchesURL}/get-branch-results/${TokenManager.getClaims()?.userId}`, {
                headers: {
                    Authorization: `Bearer ${TokenManager.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllPublicBranchs: () => axios.get(`${branchesURL}/public`)
        .then(response => response.data.publicBranches)
        .catch(error => console.log(error)),
    getBranch: (branchId) => axios.get(`${branchesURL}/${branchId}`)
        .then(response => response.data.branch)
        .catch(error => console.log(error)),
    getLastVersionOfBranchWithId: () => axios.get(`${branchesURL}/get-last-version`)
        .then(response => response.data)
        .catch(error => console.log(error)),
    getLastVersionOfBranchWithIdAuthed: async () => {
        try {
            const response = await axios.get(`${branchesURL}/get-last-version/${TokenManager.getClaims()?.userId}`, {
                headers: {
                    Authorization: `Bearer ${TokenManager.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCommitErrors: () => axios.get(`${branchesURL}/get-commit-errors`)
        .then(response => response.data)
        .catch(error => console.log(error)),
    getCommitErrorsAuthed: async () => {
        try {
            const response = await axios.get(`${branchesURL}/get-commit-errors-authed/${TokenManager.getClaims()?.userId}`, {
                headers: {
                    Authorization: `Bearer ${TokenManager.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllBranchesOfUserWithId: async (userId, token) => {
        try {
            const response = await axios.get(`${branchesURL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.userBranches;
        } catch (error) {
            throw error;
        }
    }
};