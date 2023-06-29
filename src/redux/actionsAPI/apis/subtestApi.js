import axios from "axios";

const subtestURL = "http://localhost:8080/subtests";
const testURL = "http://localhost:8080/testresults";

export const subtestCommands = {
    getParticularSubtest: (subTestId) => axios.get(`${subtestURL}/${subTestId}`)
        .then(response => response.data.subTest)
        .catch(error => error.response.data),

    getAllSubtestsOfTestWithId: (testId) => axios.get(`${subtestURL}/test/${testId}`)
        .then(response => response.data.subtests)
        .catch(error => error.response.data),

    getNumberOfTestStepsOfSubtestWithId: (subtestId) => axios.get(`${subtestURL}/${subtestId}/count`)
        .then(response => response.data.subtests)
        .catch(error => error.response.data),

    getNumberOfPassedTestStepsOfSubtestWithId: (subtestId) => axios.get(`${subtestURL}/${subtestId}/count/passed`)
        .then(response => response.data.subtests)
        .catch(error => error.response.data),

    getTestStepsNumberOfSubestInTestWithId: (testId) => axios.get(`${subtestURL}/tests/${testId}/count-new`)
        .then(response => response.data)
        .catch(error => error.response.data),
    
};