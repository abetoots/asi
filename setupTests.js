import firebasemock from 'firebase-mock';

//Setup mocking of firebase
//https://github.com/soumak77/firebase-mock/blob/master/tutorials/integration/setup.md
const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();

const mocksdk = new firebasemock.MockFirebaseSdk(
    null,
    () => mockauth,
    () => mockfirestore,
    () => mockstorage,
    null
);

jest.mock('./src/firebase-init.js', () => mocksdk);
