import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../misc/tools/util';

const initialState = {
    initializedFirebaseAuth: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_FIREBASE_AUTH:
            return updateObject(state, { initializedFirebaseAuth: true });
        default:
            return state;
    }
}

export default reducer;