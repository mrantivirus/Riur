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
import todos from './todos.reducer';
import visibilityFilter from './visibilityFilter.reducer';

const rootReducer = combineReducers({
    todoReducer,
    visibilityFilter
});

export default rootReducer;