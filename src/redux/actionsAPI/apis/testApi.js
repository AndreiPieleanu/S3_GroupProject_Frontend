import axios from "axios";

const testURL = "http://localhost:8080/testresults";
const testSetURL = "http://localhost:8080/testSets";

export const testCommands = {
    getParticularTest: (testId) => axios.get(`${testURL}/${testId}`)
        .then(response => response.data.test)
        .catch(error => error.response.data),

    getAllTestsOfTestSetWithId: (testSetId) => axios.get(`${testURL}/testSet/${testSetId}`)
        .then(response => response.data.testResults)
        .catch(error => error.response.data),

    getAllNumberOfSubtestsOfTestWithId: (testId) => axios.get(`${testURL}/${testId}/count`)
        .then(response => response.data.count)
        .catch(error => error.response.data),

    getNumberOfPassedSubtestsOfTestWithId: (testId) => axios.get(`${testURL}/${testId}/count/passed`)
        .then(response => response.data.count)
        .catch(error => error.response.data),

    getResultsForSubtestsOfTestWithId: (testId) => axios.get(`${testURL}/${testId}/results`)
        .then(response => response.data.response)
        .catch(error => error.response.data),

    getSubtestsNumberOfTestInTestSetWithId: (testSetId) => axios.get(`${testURL}/testSets/${testSetId}/count-new`)
        .then(response => response.data)
        .catch(error => error.response.data),
};