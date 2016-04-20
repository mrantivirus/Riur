/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule subreddit.reducer
 */

'use strict';

import { combineReducers } from 'redux';

export const selectedSubreddit = (state = 'reactjs', action) => {
    switch (action.type) {
        case 'SELECT_SUBREDDIT':
            return action.subreddit;
        default:
            return state;
    }
};

const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'INVALIDATE_SUBREDDIT':
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case 'REQUEST_POSTS':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_POSTS':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

export const postsBySubreddit = (state = {}, action) => {
    switch (action.type) {
        case 'INVALIDATE_SUBREDDIT':
        case 'RECEIVE_POSTS':
        case 'REQUEST_POSTS':
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state;
    }
};

export default combineReducers({
    postsBySubreddit,
    selectedSubreddit
});