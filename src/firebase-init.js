// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
// Add the Firebase products that you want to use
import 'firebase/analytics';
import 'firebase/auth'; // needed by firebaseui
import 'firebase/firebase-storage';
import 'firebase/firestore';

// Add FirebaseUI drop-in to handle authentication UI flows
import * as firebaseui from 'firebaseui';
import { TERMS_OF_SERVICE_PATH, PRIVACY_POLICY_PATH } from './misc/shared/constants';
const CLIENT_ID = '16663924320-uc0mu3p3i8ulu43db50jfvph5jlb0qi6.apps.googleusercontent.com';

//So we can dispatch actions outside a component
import { signInSuccess, signOut } from './store/actions/user';
import { initFirebaseAuth } from './store/actions/global';
import { store } from './index';

const firebaseConfig = {
    apiKey: "AIzaSyAqmbeMAnLJBQ-kOUd6CFrbXiqg3-bZr_A",
    authDomain: "alsi-684f0.firebaseapp.com",
    databaseURL: "https://alsi-684f0.firebaseio.com",
    projectId: "alsi-684f0",
    storageBucket: "alsi-684f0.appspot.com",
    messagingSenderId: "16663924320",
    appId: "1:16663924320:web:9574e037f8f08ca1f13d05",
    measurementId: "G-H2FJQE8EMR"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
// console.log('initialized firebase');
firebase.analytics();

//Initialize Cloud Firestore
export const db = firebase.firestore();
export const vendorsRef = db.collection('vendors');
export const stateRef = db.collection('state');

//Create a reference to the Cloud Storage service
export const storage = firebase.storage();
// Create a storage reference from our storage service
export const storageRef = storage.ref();
//Create a child reference to '/images'
export const imageRef = storageRef.child('images');
//Used by the UploadTask observer when monitoring upload progress to Cloud Storage
//https://firebase.google.com/docs/storage/web/upload-files?authuser=0
export const taskState = firebase.storage.TaskState;
export const taskEvent = firebase.storage.TaskEvent;
/**
 * The config for the FirebaseUI drop-in
 * Instead of an object, convert into a function so we can pass a handler from a component for the sign-in success
 * @param {handleSignedInUser} function Sign in success handler
 * @param {redirect} boolean Whether to redirect or not. Defaults to false
 * @returns {Object} The config to be used in ui.start(container, config)
 */
export const getUIConfig = (redirect = false) => {
    return {
        callbacks: {
            // Called when the user has been successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                if (authResult.user) {
                    store.dispatch(signInSuccess(authResult.user));
                }
                if (authResult.additionalUserInfo.isNewUser) {
                    console.log('new user', '[signInSuccess]');
                }
                // Do not redirect by default.
                return redirect;
            },
            signInFailure: function (error) {

            }
        },
        // Opens IDP Providers sign-in flow in a popup.
        signInFlow: 'popup',
        signInOptions: [
            // The order you specify them will be the order they are displayed        
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // Required to enable ID token credentials for this provider.
                clientId: CLIENT_ID
            },
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: window.location.origin + TERMS_OF_SERVICE_PATH,
        // Privacy policy url/callback.
        privacyPolicyUrl: window.location.origin + PRIVACY_POLICY_PATH
    }
}

export const authService = firebase.auth();
// Instantiate the FirebaseUI Widget using Firebase.
const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
firebase.auth().onAuthStateChanged(function (user) {
    store.dispatch(initFirebaseAuth());
    if (user) {
        // User is signed in.
        //When signInSuccessWithAuthResult is called after successful login, the observer gets triggered.
        //We don't want to dispatch a duplicate signInSuccess again on trigger, but only when the app is instantiated.
        // If the app is reloaded/revisited, the state gets reset. This is when we should dispatch an automatic sign-in
        // if user is found
        if (!store.getState().user.signedIn && !store.getState().user.pending) {
            store.dispatch(signInSuccess(user));
        }
    } else {
        // No user is signed in.
        console.log('user not signed in');
        // The start method will wait until the DOM is loaded.
    }
});

//To be used by components
export const startUI = (container, config) => {
    ui.start(container, config);
};

export const logOut = async () => {
    try {
        await firebase.auth().signOut()
            .then(() => {
                store.dispatch(signOut());
            });

    } catch (err) {
        console.log(err);
    }

}

//The three observers:
// 1. 'state_changed' observer, called any time the state changes
export const handleStateChange = snapshot => {
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
    }
}

// 2. Error observer, called on failure
export const handleUploadError = err => {
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
}

// 3. Completion observer, called on successful completion
export const handleUploadCompletion = async (formData) => {
    try {
        //Wait so we can reassign our profilePhoto property to the download URL
        await uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('Uploaded a blob or file!');
            console.log('File available at', downloadURL);
            formData.profilePhoto = downloadURL;
        });

        // Data can now be added to Cloud Firestore
        vendorsRef.doc(user.uid).set(formData)
            .then(() => {
                console.log("Document successfully written!");
            })
    } catch (err) {
        console.log(err);
    }
}