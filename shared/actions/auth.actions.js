/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule auth.actions
 */

'use strict';

import fetch from '../utils/fetch';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const requestLogin = (creds) => {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
};

const receiveLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user
    };
};

const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    };
};

export const loginUser = (creds) => {
    return ( dispatch ) => {
        dispatch(requestLogin(creds));
        
        return fetch.post('/auth/login', JSON.stringify(creds))
            .then(response => response.json())
            .then((user) => {
                // if (!response.ok) {
                //     dispatch(loginError(user.message));
                //     return Promise.reject(user);
                // }
                
                dispatch(receiveLogin(user));
            })
            .catch(err => console.log('Error:', err));
    };
};

export const serverLogin = (user) => {
    return (dispatch) => {
        return dispatch(receiveLogin(user));
    };
};



export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export const logoutUser = () => {
    return ( dispatch ) => {
        dispatch(requestLogout());
        
        return fetch.get('/auth/logout')
            .then(response => response.json())
            .then((response) => {
                dispatch(receiveLogout());
            })
            .catch(err => console.log('Error:', err));
    };
};