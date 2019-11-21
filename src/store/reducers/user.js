import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../misc/tools/util';

const initialState = {
    signedIn: false,
    uid: '',
    displayName: '',
    email: '',
    emailVerified: false,
    pending: false
}

const signInSuccess = (state, action) => {
    return updateObject(state, {
        signedIn: true,
        uid: action.uid,
        displayName: action.displayName,
        email: action.email,
        emailVerified: action.emailVerified,
        pending: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNIN_START:
            return updateObject(state, { pending: true });
        case actionTypes.SIGNIN_SUCCESS:
            return signInSuccess(state, action);
        case actionTypes.SIGN_OUT:
            return initialState;
        default:
            return state;
    }
}

export default reducer;