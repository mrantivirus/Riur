/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todo.actions
 */

'use strict';

/*
* Action types
*/
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

/*
* Action Creators
*/
export function addTodo (text) {
    return { type: ADD_TODO, text };
};

export function completeTodo (index) {
    return { type: COMPLETE_TODO, index };
};