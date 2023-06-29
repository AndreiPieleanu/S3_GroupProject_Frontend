import AxiosAPI from "../../utils/AxiosAPI";
import EndPoints from "../../utils/EndPoints";

export const FETCH_TEST_SET_DATA_REQUEST = 'FETCH_TEST_SET_DATA_REQUEST';
export const FETCH_TEST_SET_DATA_SUCCESS = 'FETCH_TEST_SET_DATA_SUCCESS';
export const FETCH_TEST_SET_DATA_FAILURE = 'FETCH_TEST_SET_DATA_FAILURE';

export const fetchTestSetDataRequest = () => ({
    type: FETCH_TEST_SET_DATA_REQUEST
});

export const fetchTestSetDataSuccess = (testSetData) => ({
    type: FETCH_TEST_SET_DATA_SUCCESS,
    payload: testSetData
});

export const fetchTestSetDataFailure = (error) => ({
    type: FETCH_TEST_SET_DATA_FAILURE,
    payload: error
});
//TODO endpoint generator
export const fetchTestSetData = (testSetId,refresh =false) => {
    let endpointUrl = EndPoints.TEST_RESULT+EndPoints.TEST_SET+"/"+testSetId;
    return async (dispatch) => {
        dispatch(fetchTestSetDataRequest());
        try {
            const response = await AxiosAPI.get(endpointUrl);
            const testSetData = response.data;
            dispatch(fetchTestSetDataSuccess(testSetData));
        } catch (error) {
            dispatch(fetchTestSetDataFailure(error.message));
        }
    };
};