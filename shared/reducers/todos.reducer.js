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

import { ADD_TODO, COMPLETE_TODO } from '../actions';

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state.todos,
                {
                    text: action.text,
                    isCompleted: false
                }
            ];
        case COMPLETE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        isCompleted: true
                    });
                }
                return todo;
            });
        default:
            return state;
    }
};

export default todos;