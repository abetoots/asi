import truncate from 'lodash.truncate';
import parse from 'html-react-parser';
import { render } from '@testing-library/react';
import React from 'react'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer as reducer } from '../../index';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';


export const updateObject = (oldState, newProperties) => {
    return {
        ...oldState,
        ...newProperties
    }
}

export const checkInputValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
        let regex = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
        isValid = regex.test(value) === true && isValid;
    }

    if (rules.isPhoneNum) {
        let regex = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$', 'g');
        isValid = regex.test(value) === true && isValid;
    }

    if (rules.isUrl) {
        let regex = new RegExp('((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\w]*))?)');
        isValid = regex.test(value) === true && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isTwitter) {
        let regex = new RegExp('^@?(\\w){1,15}$');
        isValid = regex.test(value) === true && isValid;
    }

    return isValid;
}

export const uniqArray = menus => {

    //check if param is array
    if (!Array.isArray(menus)) {
        return;
    }

    const s = new Set();
    const a = [];

    menus.forEach(itm => {
        //check if Set does not have the value, then add them to Set and the array to be returned
        if (!s.has(itm.path)) {
            s.add(itm.path);
            a.push(itm);
        }
    });

    return a;
}

export const isFunction = funcToCheck => {
    return funcToCheck && {}.toString.call(funcToCheck) === '[object Function]';
}

export const isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

export const fileSizeExceeds = (file, validSize) => {
    if (file.constructor !== File) {
        return new Error('Not a file');
    }

    if (typeof validSize !== 'number') {
        return new Error('Not a number');
    }
    //Check by megabytes
    //True if filesize bigger than valid size * 1024
    return Math.round((file.size / 1024)) >= (1024 * validSize);

}

export const truncateHtml = (htmlString, maxLength) => {

    let truncated = truncate(htmlString, {
        length: maxLength,
        //lazy match(shortest substring) a closing html tag , spaces after comma ,or spaces after period to be used as a separator
        separator: /,? +|.? +|<\/.*?>/
    });
    const parseOptions = {
        replace: (domNode) => {
            // console.log(domNode)
        }
    };

    return parse(truncated, parseOptions);

}

export const validateFilters = (filters) => {
    if (!isObject(filters)) {
        return new Error('Filters not an object')
    }
    let isValid = true;
    let toCheck = ['input', 'categories', 'location'];
    let properties = filters.keys();

    toCheck.forEach(c => {
        properties.includes(c);
    });

    return isValid;
}

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
export const renderWithRedux = (
    ui,
    { initialState, store = createStore(reducer, initialState) } = {},
) => {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}

// this is a handy function that I would utilize for any component
// that relies on the router being in context
export const renderWithRouter = (
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    }
}