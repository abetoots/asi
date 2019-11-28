import * as actionTypes from './actionTypes';
import { vendorsRef } from '../../firebase-init';
import { validateFilters } from '../../misc/tools/util';


export const retrieveVendorsStart = () => {
    return {
        type: actionTypes.RETRIEVE_VENDORS_START
    }
}
export const retrieveVendorsFailed = (error) => {
    return {
        type: actionTypes.RETRIEVE_VENDORS_FAILED,
        error: error
    }
}
export const retrieveVendorsSuccess = (data) => {
    return {
        type: actionTypes.RETRIEVE_VENDORS_SUCCESS,
        vendors: data
    }
}

export const retrieveVendors = () => {
    return dispatch => {
        dispatch(retrieveVendorsStart());

        vendorsRef.get().then(querySnapshot => {
            const data = [];
            querySnapshot.forEach(doc => {
                data.push({ id: doc.id, data: doc.data() });
            })
            dispatch(retrieveVendorsSuccess(data));
        })
            .catch(error => {
                dispatch(retrieveVendorsFailed(error));
            });
    }
}

export const retrieveVendorsByFilter = (filters) => {
    return dispatch => {
        dispatch(retrieveVendorsStart());

        if (!validateFilters(filters)) {
            return new Error('invalid filters');
        }
        //Build our query
        let query = vendorsRef;
        //
        if (filters.categories.length > 0) {
            query = query.where('categories', 'array-contains-any', filters.categories);
        }

        if (filters.input) {
            query = query.where('businessName', '>=', filters.input).where('businessName', '<=', filters.input + '\uf8ff')
        }

        query.get().then(querySnapshot => {
            const data = [];
            querySnapshot.forEach(doc => {
                data.push({ id: doc.id, data: doc.data() });
            })
            console.log(data);
            dispatch(retrieveVendorsSuccess(data));
        })
            .catch(error => {
                console.log(error);
                dispatch(retrieveVendorsFailed(error));
            });

    }
}

export const retrieveVendorsByCategory = category => {
    return dispatch => {
        dispatch(retrieveVendorsStart());

        vendorsRef.where('categories', 'array-contains', category).get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, data: doc.data() });
                })
                console.log(data);
                dispatch(retrieveVendorsSuccess(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(retrieveVendorsFailed(error));
            })
    }
}