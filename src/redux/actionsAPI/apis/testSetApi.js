import axios from "axios";

const testSetURL = "http://localhost:8080/testSets";

export const testSetCommands = {
    getParticularTestSet: (testSetId) => axios.get(`${testSetURL}/${testSetId}`)
        .then(response => response.data.testSet)
        .catch(error => error.response.data),

    getAllTestSetsOfCommitWithId: (commitId) => axios.get(`${testSetURL}/commits/${commitId}`)
        .then(response => response.data.testSets)
        .catch(error => error.response.data),

    getNumberOfTestsOfTestSetWithId: (testSetId) => axios.get(`${testSetURL}/${testSetId}/count`)
        .then(response => response.data.testCount)
        .catch(error => error.response.data),

    getNumberOfPassedTestsOfTestSetWithId: (testSetId) => axios.get(`${testSetURL}/${testSetId}/count/passed`)
        .then(response => response.data.testCount)
        .catch(error => error.response.data),

    getResultsForTestsOfTestSetWithId: (testSetId) => axios.get(`${testSetURL}/${testSetId}/results`)
        .then(response => response.data.response)
        .catch(error => error.response.data),

    getTestsNumberOfTestSetInCommitWithId: (commitId) => axios.get(`${testSetURL}/commits/${commitId}/count-new`)
        .then(response => response.data)
        .catch(error => error.response.data),
        
};