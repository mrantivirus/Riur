/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule visibilityFilter.reducer
 */

'use strict'

import { SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions';
const { SHOW_ALL } = VisibilityFilters;

const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export default visibilityFilter;