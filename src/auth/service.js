import { httpApiUrl } from '../core/api';
import {getLogger} from "../core/utils";
import {Alert} from 'react-native';
const log = getLogger('auth/service');


export const login =(user) => (dispatch) => {
    dispatch({ type: 'LOGIN_STARTED'});
    return fetch(`${httpApiUrl}/api/auth/signin`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)})
        .then((response) => {
            if (!response.ok) {

                console.log('User or password is incorrect');
                Alert.alert('ERROR', 'User or password is incorrect');
                dispatch({ type: 'LOGIN_FAILED', data: 'User or password is incorrect' });
            }
            else return response;
        }).then((response)=>response.json()).then((response)=>{
            console.log("---------------------------------"+response.token);
            dispatch({ type: 'LOGIN_SUCCEEDED', data: response.token});

        })
        .catch(error =>
        {
            dispatch({ type: 'LOGIN_FAILED', data: error.message });
        });
};


export const authReducer = (state = { error: null, isLoading :false }, action) => {
    switch (action.type) {
        case 'LOGIN_STARTED':
            return { ...state, isLoading: true };
        case 'LOGIN_SUCCEEDED':
            return { ...state, error: null, token: action.data, isLoading: false };
        case 'LOGIN_FAILED':
            return { ...state, error: action.data, isLoading: false };
        default:
            return state;
    }
};
