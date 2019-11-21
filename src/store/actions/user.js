import * as actionTypes from './actionTypes';

export const signInStart = () => {
    return {
        type: actionTypes.SIGNIN_START
    }
}

export const signInSuccess = (user) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified
    }
}

export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT
    }
}
