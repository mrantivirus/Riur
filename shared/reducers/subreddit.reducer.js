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
import { fromJS, List, Map } from 'immutable';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, RECEIVE_POSTS, REQUEST_POSTS } from '../constants';

export const selectedSubreddit = (state = 'reactjs', action) => {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
};

const initialPostsState = Map({
    isFetching: false,
    didInvalidate: false,
    items: List()
});

const posts = (state = initialPostsState, action) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return state.merge({
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return state.merge({
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return state.merge({
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return fromJS(state);
    }
};

const initialSubredditState = Map();

export const postsBySubreddit = (state = initialSubredditState, action) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:      
            return state.merge({
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return fromJS(state);
    }
};

export default combineReducers({
    postsBySubreddit,
    selectedSubreddit
});