import axios from "axios";
import TokenManager from "../../AuthAPIs/TokenManager";

const commitsURL = "http://localhost:8080/commits";

export const commitCommands = {
    getParticularCommit: (commitId) => axios.get(`${commitsURL}/${commitId}`)
        .then(response => response.data.commit)
        .catch(error => error.response.data),

    getAllCommitsOfBranchWithId: (branchId) => axios.get(`${commitsURL}/branch/${branchId}`)
        .then(response => response.data.commits)
        .catch(error => error.response.data),

    getAllCommitsResultsOfBranchWithId: (branchId) => axios.get(`${commitsURL}/branch/${branchId}/response`)
        .then(response => response.data)
        .catch(error => error.response.data),

    getTestSetsResultsOfCommitWithId: (commitId) => axios.get(`${commitsURL}/${commitId}/response`)
        .then(response => response.data.response)
        .catch(error => error.response.data),

    getAllCommitsPostedByUserWithId: (userId, token) => axios.get(`${commitsURL}/all/users/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        })
        .then(response => response.data.commits)
        .catch(error => {
            throw error;
        }),

    getTestSetsNumberOfCommitsInBranchWithId: (branchId) => axios.get(`${commitsURL}/branch/${branchId}/count-new`)
        .then(response => response.data)
        .catch(error => error.response.data),
};