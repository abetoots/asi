import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../misc/tools/util';

const initialState = {
    vendors: [],
    loading: false,
    loaded: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RETRIEVE_VENDORS_START:
            return updateObject(state, { loading: true })
        case actionTypes.RETRIEVE_VENDORS_FAILED:
            return updateObject(state, { error: action.error, loading: false })
        case actionTypes.RETRIEVE_VENDORS_SUCCESS:
            return updateObject(state, { vendors: action.vendors, loading: false, loaded: true })
        default:
            return state;
    }
}

export default reducer;