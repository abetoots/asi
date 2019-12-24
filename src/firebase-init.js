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

//So we can dispatch actions outside a component
import * as actions from './store/actions/index';
import { store } from './index';
import { firebaseConfig } from '../firebase-config';

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
// console.log('initialized firebase');
firebase.analytics();

//Initialize Cloud Firestore
export const db = firebase.firestore();
// Enable offline persistence
db.enablePersistence()
    .catch(function (err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
            console.log(err.code);
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
            console.log(err.code);
        }
    });
export const vendorsRef = db.collection('vendors');
// Listen to offline data
// https://firebase.google.com/docs/firestore/manage-data/enable-offline#listen_to_offline_data
vendorsRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            console.log("Change added: ", change.doc.data());
        }
        let source = snapshot.metadata.fromCache ? 'local cache' : 'server';
        console.log('Data came from ' + source, '[vendorsRef]');
    })
});
export const stateRef = db.collection('state');

//Create a reference to the Cloud Storage service
export const storage = firebase.storage();
// Create a storage reference from our storage service
export const storageRef = storage.ref();
//Create a child reference to '/images'
export const imageRef = storageRef.child('images');
export const thumbRef = imageRef.child('thumbnails');
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
                    if (authResult.additionalUserInfo.isNewUser) {
                        //we only need this to set loadedAccount to true
                        store.dispatch(actions.retrieveAccountSuccess({}));
                    }
                    store.dispatch(actions.signInSuccess(authResult.user));
                    if (authResult.additionalUserInfo.isNewUser) {
                        console.log('new user', '[signInSuccess]');
                    }
                    // Do not redirect by default.
                    console.log(redirectUrl);
                    return redirect;
                }
            },
            signInFailure: function (error) {
                // Some unrecoverable error occurred during sign-in.
                // Return a promise when error handling is completed and FirebaseUI
                // will reset, clearing any UI. This commonly occurs for error code
                // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                // occurs. Check below for more details on this.
                // return handleUIError(error);
                console.log(error)
            },
        },

        // Opens IDP Providers sign-in flow in a popup.
        signInFlow: 'popup',
        signInOptions: [
            // The order you specify them will be the order they are displayed        
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // Required to enable ID token credentials for this provider.
                //One-tap sign-up
                //https://github.com/firebase/firebaseui-web#one-tap-sign-up
                // clientId: CLIENT_ID
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
    store.dispatch(actions.initFirebaseAuth());
    if (user) {
        // User is signed in.
        //When signInSuccessWithAuthResult is called after successful login, the observer gets triggered.
        //We don't want to dispatch a duplicate signInSuccess again on trigger, but only when the app is instantiated.
        // If the app is reloaded/revisited, the state gets reset. This is when we should dispatch an automatic sign-in
        // if user is found
        if (!store.getState().user.signedIn && !store.getState().user.pending) {
            store.dispatch(actions.signInSuccess(user));
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
        store.dispatch(actions.signOut());

    } catch (err) {
        console.log(err);
    }

}
