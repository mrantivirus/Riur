/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule visibilityFilter.actions
 */

'use strict';

/*
* Action types
*/
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
* Other Constants
*/
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
* Action Creators
*/
export function setVisibilityFilter (filter) {
    return { type: SET_VISIBILITY_FILTER, filter };
};