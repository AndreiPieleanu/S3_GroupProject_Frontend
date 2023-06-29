import {combineReducers} from "redux";
import {
    branchDataReducer,
    branchesReducer,
    commitsByVersionReducer,
    commitsErrorReducer,
    commitsReducer,
    commitsResultReducer,
    subTestDataReducer,
    subtestErrorReducer,
    subtestResultReducer,
    testDataReducer,
    testErrorReducer,
    testErrorsReducer,
    testResultReducer,
    testSetDataReducer,
    testsetErrorReducer,
    testsetResultReducer,
    testStepsByErrorReducer,
    testStepsByResultReducer
} from "./reducers/apiReducers";
import {
    branchNameReducer,
    commitCodeReducer, commitNameReducer,
    commitVersionReducer,
    currentViewReducer,
    errorTermReducer,
    filterTestStepResultReducer, setTestCountReducer,
    subtestCodeReducer, subTestNameReducer,
    testCodeReducer,
    testCountReducer, testNameReducer,
    testSetCodeReducer, testSetNameReducer, testStepNameReducer
} from "./reducers/otherReducers";
import {
    branchIdReducer,
    commitIdReducer,
    subTestIdReducer,
    testIdReducer,
    testSetIdReducer
} from "./reducers/idReducers";
import {
    branchResultCountReducer,
    subTestCountReducer,
    testSetCountReducer,
    testStepCountReducer
} from "./reducers/countReducers";
/**There are two types of reducers, normal reducer and API reducers.They all follow the same patter according to their scope.
 that fetch from the back-end controller are defined in `redux/actionsApi/`,
 Everything else is in `redux/actions.js`
 reducer is what sets the redux state. example on devTools branchId state gets when branchIdReducer changes state,
 which gets called by an action

 The combineReducers below is what store.js looks at to determine the states of the application,
 data gets then fetched put it into the state through the reducer*/
export default combineReducers({
    branchId: branchIdReducer,
    testSetId: testSetIdReducer,
    testId: testIdReducer,
    subTestId: subTestIdReducer,
    branchData: branchDataReducer,
    testSetData: testSetDataReducer,
    testData: testDataReducer,
    subTestData: subTestDataReducer,
    branches: branchesReducer,
    currentView: currentViewReducer,
    branchName: branchNameReducer,
    commitName: commitNameReducer,
    testSetName: testSetNameReducer,
    testName: testNameReducer,
    subTestName: subTestNameReducer,
    testStepName: testStepNameReducer,
    commitData: commitsReducer,
    commitId: commitIdReducer,
    testStepsByError: testStepsByErrorReducer,
    testStepsByResult: testStepsByResultReducer,
    testErrors: testErrorsReducer,
    filterTestStepCode: filterTestStepResultReducer,
    commitsResult: commitsResultReducer,
    commitsError: commitsErrorReducer,
    subtestResult: subtestResultReducer,
    subtestError: subtestErrorReducer,
    testResult: testResultReducer,
    testError: testErrorReducer,
    testSetResult: testsetResultReducer,
    testSetError: testsetErrorReducer,
    filterCommitCode: commitCodeReducer,
    filterTestCode: testCodeReducer,
    filterTestSetCode: testSetCodeReducer,
    filterSubtestCode: subtestCodeReducer,
    selectedCommitVersion: commitVersionReducer,
    commitsByVersion: commitsByVersionReducer,
    errorTerm: errorTermReducer,

    branchResultCount: branchResultCountReducer,
    testStepCount: testStepCountReducer,
    subTestCount: subTestCountReducer,
    testCount: testCountReducer,
    testSetCount: testSetCountReducer,
    setTestCountResult:setTestCountReducer





});


