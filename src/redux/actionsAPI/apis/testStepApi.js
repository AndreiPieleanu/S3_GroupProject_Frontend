import axios from "axios";

const testStepURL = "http://localhost:8080/teststeps";

export const testStepCommands = {
    getParticularTestStep: (setsStepId) => axios.get(`${testStepURL}/${setsStepId}`)
                                    .then(response => response.data.testStep)
                                    .catch(error => error.response.data),

    getAllTestStepsOfSubtestWithId: (subtestId) => axios.get(`${testStepURL}/subtest/${subtestId}`)
                                    .then(response => response.data.testSteps)
                                    .catch(error => error.response.data),
};