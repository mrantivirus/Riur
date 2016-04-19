/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule addTodo.container
 */

'use strict';

import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addTodo(input.value))
                input.value = ''
            } }>
                <input ref={node => {
                    input = node
                } } />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    );
};

AddTodo = connect()(AddTodo)

export default AddTodo