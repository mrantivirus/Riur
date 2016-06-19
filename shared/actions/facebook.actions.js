/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule facebook.actions
 */

'use strict';

import { push } from 'react-router-redux';
import fetch from '../utils/fetch';
import { fromJS } from 'immutable';

 const LOGIN_REQUEST = 'LOGIN_REQUEST';
 const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
 const LOGIN_FAILURE = 'LOGIN_FAILURE';

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false
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

export const fbLoginUser = (fbData) => {
    return ( dispatch ) => {
        dispatch(requestLogin());
        
        return fetch.post('/auth/facebook/login', JSON.stringify(fbData))
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                const user = fromJS(data);
                dispatch(receiveLogin(user));
                dispatch(push('/profile'));
            })
            .catch(err => {
                dispatch(loginError(err.message));
                return Promise.reject(err);
            });
    };
};

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.headers.get("X-Error-Message"));
    }
    return response;
};