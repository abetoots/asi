import * as actionTypes from './actionTypes';
import { vendorsRef } from '../../firebase-init';


export const retrieveAccountStart = () => {
    return {
        type: actionTypes.RETRIEVE_ACCOUNT_START
    }
}
export const retrieveAccountFailed = error => {
    return {
        type: actionTypes.RETRIEVE_ACCOUNT_FAILED,
        error: error
    }
}
export const retrieveAccountSuccess = data => {
    return {
        type: actionTypes.RETRIEVE_ACCOUNT_SUCCESS,
        data: data
    }
}

export const retrieveAccount = () => {
    return (dispatch, getState) => {
        dispatch(retrieveAccountStart());
        let uid = getState().user.uid;
        vendorsRef.doc(uid).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data(), '[Retrieved Acc]');
                dispatch(retrieveAccountSuccess(doc.data()));
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                dispatch(retrieveAccountSuccess('empty'));
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            dispatch(retrieveAccountFailed(error.message));
        });
    }
}
