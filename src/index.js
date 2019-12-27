import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

//Init Firebase
import './firebase-init';

//Redux
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//Redux Middleware
import ReduxThunk from 'redux-thunk';
//Redux Reducers
import userReducer from './store/reducers/user';
import accReducer from './store/reducers/account';
import globalReducer from './store/reducers/global';
import vendorsReducer from './store/reducers/vendors';

//Start components/stylesheets
import './fontawesome';
import App from './App';
import 'normalize.css';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

export const rootReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
    account: accReducer,
    vendors: vendorsReducer
});
//For Redux debugging (used with Redux Dev Tools Extension). If extension not found, falls back to compose.
const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

const target = document.getElementById('root');
if (target) {
    ReactDOM.render(
        <Provider store={store} >
            <App />
        </Provider>
        , target)
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js").then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    })
}