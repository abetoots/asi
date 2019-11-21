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