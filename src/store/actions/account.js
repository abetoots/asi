import * as actionTypes from './actionTypes';

import {
    imageRef,
    vendorsRef,
    firebaseApp,
    taskState,
    stateRef,
} from '../../firebase-init';

import { fileSizeExceeds } from '../../misc/tools/util';


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
        //To prevent unexpected data, we get a schema object from the server and only get the data that matches with it
        //get the account state object

        stateRef.doc('account').get()
            .then(doc => {
                if (doc.exists) {
                    return doc.data(); //return the object
                } else {
                    console.log('No account state from server')
                }
            })
            .then(state => {

                let uid = getState().user.uid;
                //get the current user's data
                vendorsRef.doc(uid).get().then((doc) => {
                    if (doc.exists) {
                        // console.log(doc.data(), '[Retrieved Acc]');
                        //get the keys from state
                        let keys = Object.keys(state);
                        let data = doc.data();
                        //let's only get the data that matches with a key
                        //for each key, if the data has it, assign that key's value from data to the state object
                        keys.forEach(key => {
                            if (key === 'profilePhoto') {
                                state[key].url = data[key] ? data[key] : '';
                            } else {
                                state[key] = data[key] ? data[key] : '';
                            }
                        });

                        //dispatch the state object
                        dispatch(retrieveAccountSuccess(state));
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        dispatch(retrieveAccountSuccess('empty'));
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                    dispatch(retrieveAccountFailed(error.message));
                });
            })
            .catch(error => {
                console.log(error, '[account state retrieval]')
            })

    }
};

export const updateAccountStart = () => {
    return {
        type: actionTypes.UPDATE_ACCOUNT_START
    }
}
export const updateAccountFailed = error => {
    return {
        type: actionTypes.UPDATE_ACCOUNT_FAILED,
        error: error.message
    }
}
export const updateAccountSuccess = data => {
    return {
        type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
        data: data
    }
}

export const updateAccount = (formData, upload, fileObj = null) => {
    return (dispatch) => {
        dispatch(updateAccountStart());
        let uid = firebaseApp.auth().currentUser.uid;
        //Should upload
        if (upload) {
            //if file size is bigger than 2mb
            if (fileSizeExceeds(fileObj.file, 2)) {
                dispatch(updateAccountFailed({ message: 'File too big. Please upload a file less than 2 MB' }))
                return;
            }
            let type = fileObj.file.type.replace(/image\//, '').replace('jpeg', 'jpg');
            let uploadRef = imageRef.child(`${fileObj.fileName}.${type}`);
            //Upload the file
            //https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask.html
            const uploadTask = uploadRef.put(fileObj.file);

            uploadTask.then(async snapshot => {
                console.log(snapshot);
                //replace

                try {
                    await snapshot.ref.getDownloadURL()
                        .then(function (downloadURL) {
                            console.log('Uploaded a blob or file!');
                            console.log('File available at', downloadURL);

                            formData.profilePhoto = downloadURL;
                        });

                    await vendorsRef.doc(uid).set(formData)
                        .then(() => {
                            console.log("Document successfully written!");
                        });

                    dispatch(updateAccountSuccess(formData))

                } catch (error) {
                    console.log(error)
                    dispatch(updateAccountFailed(error));

                }
                //Wait so we can reassign our profilePhoto property to the download URL

            })
                .catch(error => {

                    // Handle unsuccessful uploads
                    console.log(error);
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                    return dispatch(updateAccountFailed(error));
                })

            //The three observers:
            // 1. 'state_changed' observer, called any time the state changes
            const handleStateChange = snapshot => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case taskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case taskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default:
                }
            }
            // Register the observers:
            uploadTask.on('state_changed', handleStateChange);
        } else {
            console.log('skip upload', '[no file]');
            vendorsRef.doc(uid).set(formData)
                .then(() => {
                    console.log("Document successfully written!");
                    dispatch(updateAccountSuccess(formData))
                })
                .catch(err => {
                    console.log(err);
                    dispatch(updateAccountFailed(err));
                });
        }


    }
}
