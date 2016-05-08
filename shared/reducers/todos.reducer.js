/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todos.reducer
 */

'use strict'

import { RECEIVE_TODOS, ADD_TODO, TOGGLE_TODO } from '../constants';

const todo = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                isCompleted: false
            }
        case TOGGLE_TODO:
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, {
                isCompleted: action.isCompleted
            });
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_TODOS:
            return action.todos;
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action)
            ];
        case TOGGLE_TODO:
            return state.map((t) => 
                todo(t, action)
            );
        default:
            return state;
    }
};

export default todos;