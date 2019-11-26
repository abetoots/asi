import Logout from '../../components/Logout/Logout';
import Home from '../../containers/Home/Home';

import { TERMS_OF_SERVICE_PATH, PRIVACY_POLICY_PATH } from './constants';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

//Lazy Load Components
const AsyncAuth = asyncComponent(() => {
    return import('../../containers/Auth/Auth');
});
const AsyncAccount = asyncComponent(() => {
    return import('../../containers/Account/Account');
});
const AsyncDirectory = asyncComponent(() => {
    return import('../../containers/Directory/Directory');
})
const AsyncAbout = asyncComponent(() => {
    return import('../../containers/About/About');
})


/**
 * Adding a menu here automatically adds them to our RoutesList component(see App.js)
 * You can pass them to a Menu component knowing that the routes are taken care of.
 */

export const defaultMenu = [
    {
        path: '/',
        exact: true,
        component: Home,
        label: 'Home'
    }, {
        path: '/login',
        exact: true,
        component: AsyncAuth,
        label: 'Login'
    }, {
        path: '/directory',
        exact: true,
        component: AsyncDirectory,
        label: 'Explore'
    }, {
        path: '/donate',
        exact: true,
        component: '',
        label: 'Donate'
    },
];

export const authenticatedMenu = [
    {
        path: '/',
        exact: true,
        component: Home,
        label: 'Home'
    }, {
        path: '/account',
        exact: true,
        component: AsyncAccount,
        label: 'Account'
    }, {
        path: '/directory',
        exact: true,
        component: AsyncDirectory,
        label: 'Explore'
    }, {
        path: '/logout',
        exact: true,
        component: Logout,
        label: 'Logout'
    },
];

export const footerMenu1 = [
    {
        path: '/chapters',
        exact: true,
        component: '',
        label: 'Chapters'
    }, {
        path: '/convention',
        exact: true,
        component: '',
        label: 'Convention'
    }, {
        path: '/projects',
        exact: true,
        component: '',
        label: 'Projects'
    }
];

export const footerMenu2 = [
    {
        path: '/about',
        exact: true,
        component: AsyncAbout,
        label: 'About Us'
    }, {
        path: TERMS_OF_SERVICE_PATH,
        exact: true,
        component: '',
        label: 'Terms of Service'
    }, {
        path: PRIVACY_POLICY_PATH,
        exact: true,
        component: '',
        label: 'Privacy Policy'
    },
    {
        path: '/events',
        exact: true,
        component: '',
        label: 'Events'
    }, {
        path: '/projects',
        exact: true,
        component: '',
        label: 'Projects'
    },
];