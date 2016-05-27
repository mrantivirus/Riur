/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule rootReducer
 */

'use strict'

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth.reducer';
//import facebook from './facebook.reducer';
import todos from './todos.reducer';
import visibilityFilter from './visibilityFilter.reducer';
import { postsBySubreddit, selectedSubreddit } from './subreddit.reducer';

const rootReducer = combineReducers({
    auth,
    //facebook,
    todos,
    visibilityFilter,
    postsBySubreddit,
    selectedSubreddit,
    routing: routerReducer
});

export default rootReducer;