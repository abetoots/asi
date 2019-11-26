import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../misc/tools/util';

const initialState = {
    account: {},
    loading: false,
    loaded: false,
    updating: false,
    updated: false,
    error: '',
    updateError: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RETRIEVE_ACCOUNT_START:
            return updateObject(state, { loading: true });
        case actionTypes.RETRIEVE_ACCOUNT_FAILED:
            return updateObject(state, { error: action.error, loading: false })
        case actionTypes.RETRIEVE_ACCOUNT_SUCCESS:
            return updateObject(state, { account: action.data, loading: false, loaded: true })
        case actionTypes.UPDATE_ACCOUNT_START:
            return updateObject(state, { updating: true });
        case actionTypes.UPDATE_ACCOUNT_FAILED:
            return updateObject(state, { updateError: action.error, updating: false })
        case actionTypes.UPDATE_ACCOUNT_SUCCESS:
            return updateObject(state, { account: action.data, updating: false, updated: true })
        default:
            return state;
    }
}

export default reducer;