import { httpApiUrl } from '../core/api';

export const loadProducts =(token) => (dispatch) => {
    dispatch({ type: 'LOAD_STARTED' });
    fetch(`${httpApiUrl}/api/product`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong. '+response.status+' '+response.statusText);
            }
        })
        .then(responseJson => dispatch({ type: 'LOAD_SUCCEEDED', data: responseJson }))
        .catch(error =>dispatch({ type: 'LOAD_FAILED', error }));
};


export const productReducer = (state = { isLoading: false, products: null, issue: null }, action) => {
    switch (action.type) {
        case 'LOAD_STARTED':
            return { ...state, isLoading: true, products: null, issue: null };
        case 'LOAD_SUCCEEDED':
            return { ...state, isLoading: false, products: action.data };
        case 'LOAD_FAILED':
            return { ...state, isLoading: false, issue: { error: action.error.message }};
        default:
            return state;
    }
};

