/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule facebook.reducer
 */

'use strict'

import { FB_LOGIN_REQUEST, FB_LOGIN_SUCCESS, FB_LOGIN_FAILURE } from '../actions';

const facebookReducer = (state = {
    isFetching: false,
    isAuthenticated: false
}, action) => {
    switch (action.type) {
        case FB_LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });
        case FB_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case FB_LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        // case LOGOUT_SUCCESS:
        //     return Object.assign({}, state, {
        //         isFetching: true,
        //         isAuthenticated: false
        //     });
        default:
            return state;
    }
};

export default facebookReducer;