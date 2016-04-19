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
* Action Creators
*/
let nextId = 0;

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextId++,
        text
    };
};

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
};